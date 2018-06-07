# re-ducks assignment

* slides https://nordnet.github.io/frontend-mentorship/06-re-ducks/
* prepare simplistic state for HN app
* integrate redux into HN app with react-redux


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
* [add selectors for `isDarkTheme` and `itemsToShow`](https://nordnet.github.io/frontend-mentorship/06-re-ducks/#13)
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
