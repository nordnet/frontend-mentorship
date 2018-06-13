title: "redux middlewares"

--

<center>
  <h1>redux middlewares</h1>
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

### redux middleware

**It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer**


---

### use cases

* logging
* crash reporting
* talking to an asynchronous API
* routing
* etc

---

### solve problem of

* applying specific logic to all actions
* asynchronous logic
* any other redux related enhancing

---

### example 1: logger

![](http://i.imgur.com/BjGBlES.png)

---

### example 1: logger

```JavaScript
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```

---

### example 2: crash reporting

```JavaScript
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}
```

---

### example 3: vanilla async

```JavaScript
/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action)
  }
​
  return Promise.resolve(action).then(store.dispatch)
}
```

---

### example 4: async

```JavaScript
/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }
​
  function makeAction(ready, data) {
    const newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }
​
  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}
```

---

### example 4: fetch

```JavaScript
/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
const fetchMiddleware = store => next => ({ type, fetch, ...rest }) => {
  if (!fetch) {
    return next({ type, fetch, ...rest });
  }

  next({ type: `${type} / start`, fetch, ...rest });

  return fetch(fetch.url, fetch.options)
    .then(rawRes => rawRes.json())
    .then(res => {
      next({ type: `${type} / success`, payload: res });
      return { res };
    })
    .catch(e => {
      const err = e.toString();
      next({ type: `${type} / failure`, payload: err, error: true });
      return { err };
    });
}
```


---

### further reading

* [docs
](https://redux.js.org/advanced/middleware)
* [`applyMiddleware` docs](https://redux.js.org/api-reference/applymiddleware)

---

<center>
  <h1>redux middlewares</h1>
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
