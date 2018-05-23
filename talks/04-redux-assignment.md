# redux assignment

## simple action + reducer

Requirements
* initial state is `0`
* `store.dispatch(updateValueTo10)`
* state is `10`

TODOs List
* write an `updateValueTo10` action without payload
* write a `valueReducer`, which cares about `initialState` and reacts on `updateValueTo10`'s type by updating state to hardcoded `10`

## action with payload + reducer

Requirements
* initial state is `0`
* `store.dispatch(updateValueTo10)`
* state is `10`

TODOs List
* update an `updateValueTo10` action to have a payload
* update a `valueReducer` to react to that payload

## action creator

Requirements
* initial state is `0`
* `store.dispatch(updateValue(10))`
* state is `10`
* `store.dispatch(updateValue(20))`
* state is `20`

TODOs List:
* convert an `updateValueTo10` action to `updateValue` action creator with payload configured by its argument
* investigate if you need to change reducer or not, prove your decision

## substate

Requirements
* initial state is `{ value: 0 }`
* `store.dispatch(updateValue(10))`
* state is `{ value: 10 }`
* `store.dispatch(updateValue(20))`
* state is `{ value: 20 }`

TODOs List:
* rename reducer to `valueReducer`
* use it to derive `rootReducer` with `combineReducers`
