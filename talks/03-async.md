title: "Async: API, Promises and fetch"

--

<center>
  <h1 style="margin-top: 0; padding-top: 0;">Async: API, Promises and&nbsp;fetch</h1>
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

### API

* WWW—_World Wide Web_ (1989)
* HTTP—_HyperText Transport Protocol_ (1991)
* REST—_Representational State Transfer_ (2000)
* JSON—_JavaScript Object Notation_ (2001)
____
* CRUD—_Create, Read, Update and Delete_ (1983)
* HTTP allows 4 methods: POST, GET, PUT and DELETE

---

### API

pros:  
• presentation detached from data  
• work independence

cons:  
• remote, over the wire  
• different data formats

---

### Current web APIs

* over HTTP(s)
* CRUD/RESTful
* JSON data format

_tldr: JSON REST API_

---

### API Example: HackerNews API

* [Documentation](https://github.com/HackerNews/API)
* `https://hacker-news.firebaseio.com` base
* [`/v0/topstories.json`](https://hacker-news.firebaseio.com/v0/topstories.json) endpoint
* [`/v0/item/${itemId}.json`](https://hacker-news.firebaseio.com/v0/item/8863.json) endpoint

PS. Check out ["JSON Formatter"](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) Chrome extension

---

### Asynchronous JavaScript, history

<img src="http://www.warmingtonheritage.com/wp-content/uploads/2011/06/PICT0006.jpg" style="max-width: 100%" />

---

### Asynchronous JavaScript, history

* XMLHttpRequest
* jquery ajax, deferred
* fetch via promises

---

### XMLHttpRequest, meh

```javascript
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
```

---

### jquery ajax, deferred, better

```javascript
$.getJSON('example.json')
  .done(() => console.log('success'))
  .fail(() => console.log('error'))
  .always(() => console.log('complete'));
```
---

### fetch

```javascript
fetch('/api/2/login')
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => { console.log('its done') })
```

[https://github.com/github/fetch](https://github.com/github/fetch)

---

### `Promise`

* The `Promise` object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
* A `Promise` is a proxy for a value not necessarily known when the promise is created.

[MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

### `Promise`

A `Promise` is in one of these states:

* `pending`: initial state, neither fulfilled nor rejected.
* `fulfilled`: meaning that the operation completed successfully.
* `rejected`: meaning that the operation failed.

---

### Promises 101

```javascript
const fetchJson = url => fetch(url).then(res => res.json());

// src/utils/api.js, declaration
export const getInstrument = id => fetchJson(`/api/v2/instrument/${id}`);

// src/…/*.js, usage and error handling
api.getInstrument('TSLA')
  .then(data => { console.log(data) })
  .catch(err => console.error(err));
```

---

### Promises 101, notes

* *0a* Promises are not lazy. Once you started one, it fires immediately.
* *0b* always return functions
* *1a* be aware of [`throw` and implicit catch](https://github.com/mattdesl/promise-cookbook#throw-and-implicit-catch)
* *1b* reject only with `new Error('err description')`
* *2** handle errors when you actually using promises, not in implementation.

---

### `Promise.all`

The `Promise.all(<Array[Promise]>)` method returns a single `Promise` that resolves array of corresponding values when all of the promises have resolved. It rejects with the reason of the first promise that rejects.

```javascript
Promise.all([
  api.getInstrument('TSLA'),
  api.getInstrument('AAPL'),
  api.getInstrument('GOOGL'),
]).then(([tslaData, aaplData, googlData]) => {
  // …
})
```

---

<center>
  <h1 style="margin-top: 0; padding-top: 0;">Async: API, Promises and&nbsp;fetch</h1>
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
