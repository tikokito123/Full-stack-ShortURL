import "./css/App.css";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import NotFound from "./Components/NotFound";
import Login from "./Components/login";
import Profile from "./Components/Profile";
import ShortURL from "./Components/ShortUrl";
import { Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <div>
      <header>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/profile" component={Profile} />
          <Route path="/short-url" component={ShortURL} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
