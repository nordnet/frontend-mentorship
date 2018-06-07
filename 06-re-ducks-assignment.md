# re-ducks assignment

* slides https://nordnet.github.io/frontend-mentorship/06-re-ducks/

## what we have

```
./src/
  actions/index.js
  reducers/index.js
```

## what we want

```
./src/ducks/
  ui/
    index.js
  data/
    items.js
    itemsIds.js
    index.js
```

## 1. ui duck

* create file `src/ducks/index.js`
* add there `import * as ui from './ui';`
* create file `src/ducks/ui/index.js`
* [start with namespace `ui-duck` (we will  rename it later)](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#10)
* [define its shape with prop-types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#11)
* [define defaultState](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#12)
* [add root selector and selectors for `isDarkTheme` and `itemsToShow`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#13)
* checkpoint
* [add two action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#14)
* [add two action creators](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#15)
* [add reducer to handle both action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#16)
* dont forget to separate `rawReducer` and namespaced `reducer`

## 2. hook it up to the store

* in `src/reducers/index.js` export `uiReducer` and `dataReducer`
* in `src/index.js` import it instead of `rootReducer`
* define local `rootReducer` and combine `uiReducer` and `dataReducer`
* does everything work?
* `import * as ducks from './ducks'`
* spread `ducks.reducer` into `rootReducer`
* did state change?
* if you click `toggleTheme` button does both `ui` and `ui-duck` state change?

## 3. selectors in mapStateToProps

* in `src/components/page/index.js`
* `import * as ducks from '../ducks'`
* change `mapStateToProps` to utilise `ducks.ui.selectors` to select `isDarkTheme`
* does toggling theme still work?

## 4. actions in mapDispatchToProps

* in `src/components/header/index.js`
* `import * as ducks from '../ducks'`
* change `mapDispatchToProps` to utilise `ducks.ui.actions`
* does toggling theme still work?

## 5. selectors in mapStateToProps #2

* in `/src/components/page-news-list/index.js`
* `import * as ducks from '../ducks'`
* change `mapStateToProps` to utilise `ducks.ui.selectors` to select `itemsToShow`
* does `itemsToShow` still being taken care of?

## 6. replacing old ui substate with duck's one

* remove old `uiReducer` from the `rootReducer`
* rename namespace in ui duck from `ui-test` to `ui`
* state should return to `{ ui: {}, data: {} }`

## 7. data duck: itemsIds

* create `src/ducks/data/itemsIds.js`
* [start with namespace `itemsIds`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#10)
* [define its shape with prop-types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#11)
* [define defaultState](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#12)
* [add root selector and selectors for `ids`, `isLoading` and `error`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#13)
* checkpoint
* [add three action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#14)
* [add 4 action creators](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#15)
* [add reducer to handle all action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#16)
* dont forget to separate `rawReducer` and namespaced `reducer`

## 8. data duck: items

* create `src/ducks/data/items.js`
* [start with namespace `items`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#10)
* [define its shape with prop-types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#11)
* [define defaultState](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#12)
* [add root selector and selectors for `rootItem`, `item`, `isLoading` and `error`, `error`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#13)
* checkpoint
* [add three action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#14)
* [add 4 action creators](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#15)
* [add reducer to handle all action types](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#16)
* dont forget to separate `rawReducer` and namespaced `reducer`


## 9. data duck: composition
