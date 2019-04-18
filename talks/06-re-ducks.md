title: "re-ducks"

--

<center>
  <h1>re-ducks</h1>
  <br />
  <small>
    <i>In react we trust</i>
  </small>
  <br />
  <br />
  <small>
    by [Vladimir Starkov](https://iamstarkov.com)
    <br>
    frontend engineer at [Nordnet Bank AB](https://www.nordnet.se/)
  </small>
</center>

---

### redux recap

Redux is a predictable state container for JavaScript apps

* store **holds and guards** the state
* store offers ways to **access, update and subscribe** to the state
* actions are **update descriptions**
* reducers **apply updates**
* **state is just an object**
* next state is derived by applying reducer to an action

---

<img src="https://i.imgur.com/Q5HhrcQ.jpg" style="max-width: 100%" />

---

### ducks

* approach to modularize redux related code
* self contained redux entity
* responsible for its particular part of the state (substate):
  * namespace — key of that substate
  * actions and action creators — declaring updates
  * reducers — applying updates
  * selectors — retrieving data from state

---

### reasoning

<img src="https://i.imgur.com/UDctqcW.jpg" style="max-width: 100%" />

---

### reasoning

* scales better
* easier to reason about (read, understand and test)
* implementation details doesnt leak
* separation of concerns vs separation of tech

---


### components example

before
```
./src/
  css/
    example-component.css
  html/
    example-component.html
  js/
    example-component.js
```

after:
```
./src/components/
  example-component/
    index.js
    example-component.js (html+js)
    example-component.css (css)
  index.js (re-export entry point)
```

---


### redux before ducks

```
./src/
  action-types/
    example-action-types.js
  reducers/
    example-reducers.js
  actions/
    example-actions.js
```
---

### redux after ducks

after:
```
./src/ducks/
  example-duck/
    index.js
    action-types.js
    reducer.js
    actions.js
  index.js (re-export entry point)
```

---

### duck: namespace

key of the substate it handles

```js
{
  ui: {},
  data: {},
  [namespace]: {},
}

// example duck, ns is short for namespace
export const ns = 'ui';
```

---

### duck: shape

[prop types](https://reactjs.org/docs/typechecking-with-proptypes.html) of the values of the substate

```js
{
  ui: {
    lang: 'sv',
  },
  // …
}

// example duck's default state
import PropTypes from 'prop-types';
export const shape = {
  lang: PropTypes.string,
};
```

---

### duck: default state

default state to be used in reducer as it is

```js
{
  ui: {
    lang: 'sv',
  },
}

// example duck's default state
export const defaultState = {
  lang: 'sv',
};
```

---

### duck: selectors

gives access to the data inside of the ducks. decouple components from state's shape

be careful with a scope/namespace

```js
{
  ui: {
    lang: 'sv',
  },
  // …
}

//    root = state => state.ui;
//    root = state => state['ui'];
const root = state => state[ns];
export const selectors = {
  root,
  lang: state => root(state).lang,
}
```

---

### duck: action types

actions types to be shared between actions and reducers. it is usually good idea to namespace them as well

```js
// example duck's types
export const types = {
  updateLang: `${ns} / UPDATE_LANG`,
};
```

---

### duck: actions and action creators

```js
const updateLang = value => ({
  type: types.updateLang,
  payload: value
});

// example duck's types
export const actions = {
  updateLang,
};
```

---

### duck: reducer

```js
export const rawReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.updateLang:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

// its a good idea to namespace reducer as well
export reducer = {
  [ns]: rawReducer,
}
```

---

### duck: ui example (part 1)

```js
// src/ducks/ui/index.js
import PropTypes from 'prop-types';

export const ns = 'ui';

export const shape = {
  lang: PropTypes.string,
};

export const defaultState = {
  lang: 'sv',
};

const root = state => state[ns];
export const selectors = {
  root,
  lang: state => root(state).lang,
}

export const types = {
  updateLang: `${ns} / UPDATE_LANG`,
};

```

---

### duck: ui example (part 2)

```js
// src/ducks/ui/index.js
const updateLang = value => ({
  type: types.updateLang,
  payload: value
});

export const actions = {
  updateLang,
};

export const rawReducer = (state = defaultState, action) => {
  const { type, payload };
  switch (action.type) {
    case types.updateLang:
      return { ...state, lang: payload };
    default:
      return state;
  }
}

export reducer = {
  [ns]: rawReducer,
}
```

---

### ducks: re-export entry point

```js
// src/ducks/index.js
import * as ui from './ui';

export {
  ui,
}
// import * as example from './example';
```

---

### ducks: creating store

```js
// src/index.js
import { combineReducers } from 'redux';
import * as ducks from './ducks';

const rootReducer = combineReducers({
  ...ducks.ui.reducer, // { ui: ui.rawReducer }
  ...ducks.example.reducer, // { example: example.rawReducer }
}); // combineReducers({ ui: ui.rawReducer, example: example.rawReducer })

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
```

---

### ducks: how to use

<img src="https://i.imgur.com/GnvYdS6.jpg" style="min-width: 100%" />

---

```js
// src/example-dashboard/index.js
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ducks from '../ducks'

const ExampleDashboard = props => {
  const { updateLang, lang } = props;

  return {
    <div>
      <button onClick={e => { updateLang('sv') }}> Change lang to "sv" </button>
      <button onClick={e => { updateLang('en') }}> Change lang to "en" </button>
      <div>
        Current language: {lang}
      </div>
    </div>
  }
}

ExampleDashboard.propTypes = {
  updateLang: PropTypes.func.isRequired,
  lang: ducks.ui.shape.lang,
};

const mapStateToProps = state => ({ lang: ducks.ui.selectors.lang(state) });

const mapDispatchToProps = { updateLang: ducks.ui.actions.updateLang };

export default connect(mapStateToProps, mapDispatchToProps)(ExampleDashboard);
```

---

### nested ducks

keep state flat as possible

no more than two level of nestedness

```js
{
  firstLevel1: /* duck1 */, // OK
  firstLevel2: {
    secondLevel1: /* duck2's subduck1 */, // OK
    secondLevel2: /* duck2's subduck2 */, // OK
    secondLevel3: {
      thirdLevel1: /* duck2's subduck1's subduck1 */, // NOT OK
    },
  }
}
```

---

### nested ducks

* common namespace
* shapes — merged
* default states — merged
* selectors — augmented with nested duck's root selector
* actions — merged
* reducers — combined
* structure:
  ```
  src/ducks/nested/
    index.js
    subduck1.js
    subduck2.js
  ```

---
### nested duck: helpers

```js
// src/utils/index.js
export const mapObj = (obj, fn) => {
  return Object.keys(obj).reduce(
    (state, itemKey) => ({ ...state, [itemKey]: fn(obj[itemKey]) }),
    {}
  );
}

export const augmentSelectorWith = parentSelector => selector => {
  return (state, ...restArgs) => selector(
    parentSelector(state),
    ...restArgs
  );
};
```

---

### nested duck

```js
// src/ducks/nested/index.js
import { combineReducers } from "redux";
import subduck1 from "./subduck1";
import subduck2 from "./subduck2";
import { mapObj, augmentSelectorWith } from "../../utils";

export const ns = "data";

const root = state => state[ns];
export const selectors = {
  root,
};

export const rawReducer = combineReducers({
  ...subduck1.reducer,
  ...subduck2.reducer
});

const reducer = {
  [ns]: rawReducer
}

export default {
  ns,
  selectors,
  rawReducer,
  reducer,
  subduck1: {
    ...subduck1,
    selectors: mapObj(subduck1.selectors, augmentSelectorWith(root)),
  },
  subduck2: {
    ...subduck2,
    selectors: mapObj(subduck2.selectors, augmentSelectorWith(root)),
  },
};
```

---

<img src="https://i.imgur.com/7CbCIQx.jpg" style="max-width: 100%; min-width: 100%;" />

---

### ducks recap

* approach to modularize redux related code
* self contained redux entity
* responsible for its particular part of the state (substate):
* nested one — combination of subducks

---

### ducks properties

* namespace
* shape
* defaultState
* root selector
* selectors
* actions
* raw reducer
* reducer

---

### further reading

* [Scaling your Redux App with ducks
](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)
* [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux)

---

<center>
  <h1>re-ducks</h1>
  <br />
  <small>
    <i>In react we trust</i>
  </small>
  <br />
  <br />
  <small>
    by [Vladimir Starkov](https://iamstarkov.com)
    <br>
    frontend engineer at [Nordnet Bank AB](https://www.nordnet.se/)
  </small>
</center>
