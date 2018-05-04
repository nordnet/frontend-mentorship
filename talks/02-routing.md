title: Routing

--

<center>
  <h1>Routing</h1>
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

### Routing in a nutshell

```jsx
<a href={url}>link</a>
```

---

### react-router in a nutshell

> Declarative, dynamic routing

> Everything is a Component

---

### react-router 101


```jsx
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

/*…*/

const App = () => (
  <BrowserRouter>

    <Switch>

      <Route exact path="/" component={Main} />

      <Route path="/contacts" component={Contacts} />

      <Route path="/faq" component={Faq} />

      <Route path="/user/:userId" component={User} />

      <Redirect from="/old/url" to="/new/url" />

      <Route component={NotFound} />

    </Switch>

  </BrowserRouter>
)
```

---

### react-router: Routers

keep your UI in sync with the URL via:

* `StaticRouter` never changes location.
* `HashRouter` uses the hash (`#`) portion of the URL (i.e. window.location.hash). like in good old times.
* `MemoryRouter` keeps the history of your "URL" in memory (does not read or write to the address bar). Useful in tests.
* `BrowserRouter` uses the HTML5 history API (pushState, replaceState and the popstate event). Primary

---

### react context

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

> Q: When to Use Context?  
> A: Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

---

### react context (tldr) ([docs](https://reactjs.org/docs/context.html))

never on your own, unless you know what you are doing.

Rule of thumb: let libraries to deal with it

---

### react-router: BrowserRouter

Creates and manages url and helpers for it in a context.

Passes it down to `Switch`, `Route`, `Redirect` and `withRouter`.

```jsx
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => (
  <Router>
    {/*…*/}
  </Router>
);
```

---

### react-router: Route ([docs](https://reacttraining.com/react-router/web/api/Route))

Renders a `Component` when a react-router's `location` matches the route’s path or null otherwise.

```jsx
<Route exact path="/" component={Home}/>
<Route path="/news" component={NewsFeed}/>
```

will be rendered one `null` and either `Home` or `NewsFeed` components.


---

### react-router: Route ([docs](https://reacttraining.com/react-router/web/api/Route))

* `<Route component={Component} />` — just for a simple component
* `<Route render={() => <Component prop={true} />} />` — for inline rendering
* `<Route children={} />` — in case if you need to render whether the path matches the location or not.

All three render methods will be passed the same three route props:

* [match](https://reacttraining.com/web/api/match)
* [location](https://reacttraining.com/react-router/web/api/location)
* [history](https://reacttraining.com/react-router/web/api/history)

---

### react-router: Switch ([docs](https://reacttraining.com/react-router/web/api/Switch))

renders a particular route or redirect exclusively.

```jsx
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

---

### react-router: Redirect ([docs](https://reacttraining.com/react-router/web/api/Redirect))


if the `url` matches `from` prop redirects to `to` prop;


```jsx
<Redirect from="/old/url" to="/new/url" />
```

---

### react-router: Link ([docs](https://reacttraining.com/react-router/web/api/Link)) and NavLink ([docs](https://reacttraining.com/react-router/web/api/NavLink))

`Link` provides declarative, accessible navigation around your application.

```jsx
<Link to="/about">About</Link>
```

`NavLink` is a special version of the `Link` that will add styling attributes to the rendered element when it matches the current URL

```jsx
<NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
```

---

### react-router: `withRouter` HoC ([docs](https://reacttraining.com/react-router/web/api/withRouter))

> You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. `withRouter` will pass updated [match](https://reacttraining.com/react-router/web/api/match), [location](https://reacttraining.com/react-router/web/api/location), and [history](https://reacttraining.com/react-router/web/api/history) props to the wrapped component whenever it renders.


```jsx
import { withRouter } from 'react-router';

const User = ({ location, match, history }) => (
  <div>
    current location: {location.pathname /* '/user/123/' */}
    <br />
    User Id: {match.params.userId /* 123 */}
    <br />
    <button onClick={() => history.goBack()}>go back</button>
  </div>
)

export default withRouter(User);
```

---


### react-router: example


```jsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={InstrumentList} />
      <Route path="/instruments/:instrumentId" component={instrument} />
    </Switch>
  </BrowserRouter>
)
```

---

### Further reading

* [React-Router documentation](https://reacttraining.com/react-router/web/) (look for the left sidebar)
* [React documentation](https://reactjs.org/docs/hello-world.html) (look for the right sidebar)


---

### Assignment

* Route `/item/:itemId` to render one `NewsItem` component
* Route `/` to render `NewsItemList` Component
* Assignment's assets https://gist.github.com/iamstarkov/effaeeb6a9605bd21eb31aca65af65a7

---

<center>
  <h1>Routing</h1>
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
