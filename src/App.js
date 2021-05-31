import logo from "./logo.svg";
import "./App.css";

import { Home, Post, Item, Details, Register } from "./Pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={token == null ? Home : Post} />
        <Route
          exact
          path="/register"
          component={token == null ? Register : Post}
        />
        <Route exact path="/item/:id" component={token == null ? Home : Item} />
        <Route
          exact
          path="/details/:id"
          component={token == null ? Home : Details}
        />
      </Switch>
    </Router>
  );
}

export default App;
