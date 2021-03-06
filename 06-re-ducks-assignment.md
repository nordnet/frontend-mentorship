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
* spread `ducks.ui.reducer` into `rootReducer`
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

* create file `src/utils/ducks.js` and update `src/utils/index.js` according to the [slide #25](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#25)
* create file `src/ducks/data/index.js` and combine `items` and `itemsIds` subducks as stated in a [slide #26](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#26)
* have a temporary namespace `data-duck` (we will change it later)

## 10. data duck: store

* in `src/index.js`
* spread `ducks.data.reducer` into `rootReducer`
* did state change?
* if you open `/` route does both `data` and `data-duck` state change?
* if you open `/item/17252585` route does both `data` and `data-duck` state change?

## 11. data duck: connecting NewsItem

* in `src/components/news-item/index.js`
* `import * as ducks from '../../ducks'`
* change `mapStateToProps` to utilise relevant selector from `ducks.data.items.selectors`
* change `mapDispatchToProps` to utilise relevant action from `ducks.data.items.actions`


## 12. data duck: connecting PageNewsList

* in `src/components/page-news-list/index.js`
* `import * as ducks from '../../ducks'`
* change `mapStateToProps` to utilise relevant selector from `ducks.data.itemsIds.selectors`
* change `mapDispatchToProps` to utilise relevant action from `ducks.data.itemsIds.actions`

## 13. replacing old data substate with duck's one

* remove old `dataReducer` from the `rootReducer`
* rename namespace in data duck from `data-duck` to `data`
* state should return to `{ ui: {}, data: {} }`


## 14. cleaning up

* remove all imports of standalone `actions` and `reducers` files.
* remove files itself
* does it still work?
