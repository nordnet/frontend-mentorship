title: "Redux"

--

<center>
  <h1>Redux</h1>
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

### redux

Redux is a predictable state container for JavaScript apps

also is a framework agnostic.

*TLDR: Change emitter holding a value*

---

### predictable

Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen.

*"When did a certain slice of state change, and where did the data come from?"*

---

### debugging

* log actions and state
* find the bad state
* check the action
* fix the reducer
* write a test

[demo](http://argelius.github.io/react-onsenui-redux-weather/) via [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

### core concepts

* store **holds and guards** the state
* store offers ways to **access, update and subscribe** to the state
* actions are **update descriptions**
* reducers **apply updates**
* **state is just an object**
* next state is derived by applying reducer to an action

also selectors

---

### action ([docs](https://redux.js.org/basics/actions))

Action is a payload of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`. Should always have `type` field.

```js
{
  type: 'ADD_TODO',
  payload: 'Build my first Redux app'
}
```

OBS: [Flux Standard Action](https://github.com/acdlite/flux-standard-action/)

---

### action creators ([docs](https://redux.js.org/basics/actions#action-creators))

Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

```js
const addTodo = text => {
  return {
    type: 'ADD_TODO',
    payload: text
  }
}
```

---

### reducers ([docs](https://redux.js.org/basics/reducers))

Reducers specify how the state changes in response to actions sent to the store.  
Or  
Reducers derive new state from the current state and the action.  
OBS: pure function. no mutations, pls.

```js
// (previousState, action) => newState
const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'REMOVE_NAME':
      return { ...state, name: undefined }
    // TODO: other actions
    default:
      return state
  }
}
```

---

### combineReducers ([docs](https://redux.js.org/api-reference/combinereducers))

The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.

```js
/* State: {
  ui: {…},
  data: {…}
}
*/
const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer,
});
```

---
### action + reducer = ❤️

reducer reacts on `action.type` and handles `action.payload`

```js
const mathReducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'INC': return state + 1;
    case 'DEC': return state - 1;
    case 'MULT': return state * payload;
    case 'DIV': return state / payload;
    default: return state;
  }
}
```

---

### store

Store brings state, actions and reducers together.

* holds application state
* accepts reducer via `createStore()`
* allows access to state via `getState()`
* allows state to be updated via `dispatch(action)`
* registers listeners via `subscribe(listener)`
* handles unregistering of listeners via the function returned by `subscribe(listener)`

---

### data flow

1. `dispatch(action)`
2. redux calls `reducer` and will pass current state and action and it computes next state
3. The root reducer may combine the output of multiple reducers into a single state tree via `combineReducers`
4. Store saves the complete state tree returned by the root reducer.
5. update the ui with new state passed from

---

### further watching

* ["Turning the Database Inside Out" talk](https://www.youtube.com/watch?v=fU9hR3kiOK0)
* ["Inventing on Principle" talk](https://vimeo.com/36579366)
* ["Developing ClojureScript with Figwheel" talk](https://www.youtube.com/watch?v=j-kj2qwJa_E)
* ["Redux fundamentals" talk](https://www.youtube.com/watch?v=ewelU8WHXQ4)
* ["Live React: Hot Reloading with Time Travel" talk at react-europe 2015](https://www.youtube.com/watch?v=xsSnOQynTHs)
* ["The Redux Journey" talk at react-europe 2016](https://www.youtube.com/watch?v=uvAXVMwHJXU)
* ["Getting Started with Redux" course](https://egghead.io/courses/getting-started-with-redux)
* ["Building React Applications with Idiomatic Redux" course](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

---

### further reading

* [docs](https://redux.js.org/)
* Array.{[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),[filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),[reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)}
* [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
* [`...` aka rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
* ["Awesome redux" list](https://github.com/xgrommx/awesome-redux)

---

<center>
  <h1>Redux</h1>
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
