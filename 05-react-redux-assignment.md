# react-redux assignment

* slides https://nordnet.github.io/frontend-mentorship/05-react-redux/
* prepare simplistic state for HN app
* integrate redux into HN app with react-redux


## what we have

https://codesandbox.io/s/oow402lw4q

```js
{
  "ui": {
    "itemsToShow": Number,
    "isDarkTheme": Boolean
  },
  "data": {
    "item": Object,
    "isLoading": Boolean,
    "error": null || String
  }
}
```

## what we need

```js
{
  "ui": {
    "itemsToShow": Number,
    "isDarkTheme": Boolean
  },
  "data": {
    "itemIds": {
      "ids": [String, String, …],
      "isLoading": Boolean,
      "error": null || String
    },
    "items": {
      [String /* itemId */]: {
        "item": Object,
        "isLoading": Boolean,
        "error": null || String
      },
      /*
      "17132058": { id: "17132058", title: "Adobe Photoshop 1.0.1 Source Code (2013)", … },
      "17181046": { id: "17181046", title: "UTC Is Enough for Everyone, Right?", … },
      "17182233": { id: "17182233", title: "Imgur launches video", … },
      */
    }
  }
}
```


## 1. data split

* rename `dataReducer` to `_dataReducer` for now, we will use it later.
* convert `data` field into two combined reducers `itemIdsReducer` and `itemsReducer`, in the end you should get new `dataReducer`.
* each should do nothing, just like `const exampleReducer = (state = {}) => state;`


before:

```js
{  
  // "ui": {},
  "data": {
    "item": Object,
    "isLoading": Boolean,
    "error": null || String
  }
}
```

after:

```js
{  
  // "ui": {},
  "data": {
    "itemIds": {},
    "items": {},
  }
}
```

## 2. api prep

add `getItemsIds` function.

before:

```js
const api = {
  getItem: id => fetchJson(`${BASE_URL}/v0/item/${id}.json`),
};
```

after:

```js
const api = {
  getItem: id => fetchJson(`${BASE_URL}/v0/item/${id}.json`),
  getItemsIds: () => fetchJson(`${BASE_URL}/v0/topstories.json`),
};
```

## 3. fetching itemIds redux way

* we have pure `requestItemStart`, `requestItemSuccess`, `requestItemFail` and real `fetchItem`.
* duplicate them and rename to `requestItemIdsStart`, `requestItemIdsSuccess`, `requestItemIdsFail` and real `fetchItemIds`.
* do we need an `id` as an argument?
* look at `_dataReducer` we have, and update `itemsIdsReducer` to work in the similar way but for `ids` and to react on relevant actions.

before:

```js
{  
  // "ui": {},
  "data": {
    "itemIds": {},
    "items": {},
  }
}
```


after:

```js
{  
  // "ui": {},
  "data": {
    "itemIds": {
      "ids": [],
      "isLoading": false,
      "err": null,
    },
    "items": {},
  }
}
```

if you add in the end:

```
fetchItemIds();
```

state should become:

```js
{  
  // "ui": {},
  "data": {
    "itemIds": {
      "ids": [], // ->  [/* bunch of numbers */],
      "isLoading": true, // -> false
      "err": null,
    },
    "items": {},
  }
}
```

## 4. fetching items redux way in real app

* we have pure `requestItemStart`, `requestItemSuccess`, `requestItemFail` and real `fetchItem`.
* we still want to perform those actions, but we want to store them differently.
* thus we need to take our prev `_dataReducer`, and replace `itemsReducer` with it.
* and we need to update how we store our data.
* use `spread operator` for objects to avoid mutations on a state.

before

```js
{  
  // "ui": {},
  "data": {
    "itemIds": {
      "ids": [],
      "isLoading": false,
      "err": null,
    },
    "items": {},
  }
}
```


after updating `itemsReducer` and calling `fetchItem(17132058);` state should become:


```js
{  
  // "ui": {},
  "data": {
    "itemIds": {
      "ids": [],
      "isLoading": false,
      "err": null,
    },
    "items": {
      "17132058": {
        "item": {}, // -> {…},
        "isLoading": true // -> false
        "err": null,
      }
    },
  }
}
```


## We are done with prepping state.

lets have a break ☕️

```
npm install --save redux react-redux
```

## 5. structuring redux related code

* take attached files and place them in a project accordingly

```
# before:
src/
  components/
  utils/

# after:
src/
  actions/
    index.js
  components/
  reducers/
    index.js
  utils/
    api.js
```


tip: before you can use actions from components, you need to import them, you can do it this way: `import * as actions from '../actions'`


## 5. setting up the store

in `src/index.js`:
* import rootReducer from reducer file
* use createStore from redux and rootReducer to create store
* import Provider from react-redux
* wrap App in Provider and pass created store as a prop

* verify redux state in redux dev tools
* verify Provider setup in react dev tools


## 6. dispatching action from component

* import `toggleTheme` action into the `Header` component
* import `connect` from `react-redux`.
* connect Header component to redux state with `(null, null)` to begin with
* and export default it again
* change `src/component/index.js` to `export { default as Header } from './header'`
* `mapStateToProps` should be null here
* use object notation of `mapDispatchToProps` and map `actions.toggleTheme`.
* user react dev tools to verify that toggleTheme is passed to component as a prop.
* add button "toggle theme"
* add `onClick` handler which should invoke `props.toggleTheme`
* verify in redux dev tools that it does change state


## 7. mapping state to component

* in the `Page` component
* import `connect` from `react-redux`.
* connect `Page` component to redux state with `(null, null)` to begin with
* and export default it again
* change `src/component/index.js` to `export { default as Page } from './page'`
* `mapStateToProps` should be select `isDarkTheme` from the state and return an object with that field
* `mapDispatchToProps` should be null here;
* add css from below to `./src/page/style.css`
* change `className` to additionally include `page-dark` if `props.isDarkTheme` is true.
* verify that background is changing when you click on a button in a header


```
.page-dark {
  background: #c1c1c1;
}
```

## 8. fetching one particular item

in `NewsItem` component

* import `connect` from `react-redux`.
* connect `NewsItem` component to redux state with `(null, null)` to begin with
* and export default it again
* * change `src/component/index.js` to `export { default as NewsItem } from './news-item'`
* write `mapDispatchToProps` to utilise `actions.fetchItem` which is now a function which takes an `dispatch` and return an actual function to invoke, pass it as `{ fetchItem }`
* verify in react dev tools that you got a function passed
* use it in a `componentDidMount` instead, without internal state.
* write `mapStateToProps` to utilise state and ownProps.id to pass `{ item }` from the redux state.
* in render use item from the props and not from the internal state.
* remove constructor

## 9. fetching items ids

in `PageNewsList` component

* import `connect` from `react-redux`.
* connect `PageNewsList` component to redux state with `(null, null)` to begin with
* and export default it again
* * change `src/component/index.js` to `export { default as PageNewsList } from './page-news-list'`
* write `mapDispatchToProps` to utilise `actions.fetchItemsIds` which is now a function which takes an `dispatch` and return an actual function to invoke, pass it as `{ fetchItemIds }`
* verify in react dev tools that you got a function passed
* use it in a `componentDidMount` instead, without internal state.
* write `mapStateToProps` to utilise `state.data.itemsIds.ids` and `state.ui.itemsToShow` to pass _fist N_ ids as `{ ids }` from the redux state. use helper function `const firstN = (n, arr) => arr.slice(0, n);`
* in render use `ids` from the props and not from the internal state.
* remove constructor
* update `shouldComponentUpdate` to compare props only


EOF
