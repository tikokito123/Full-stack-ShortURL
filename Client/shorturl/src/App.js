import './App.css';
import Signup from './Components/Signup';
import Home from './Components/Home'
import Admin from './Components/Admin';
import NotFound from './Components/NotFound';
import Login from './Components/login';
import {Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
       <Route path="/signup" component={Signup}/>
       <Route path="/login" component={Login}/>
       <Route path="/admin" component={Admin}/>
       <Route path="/not-found" component={NotFound}/>
       <Route path="/" exact component={Home}/>
       <Redirect to="/not-found" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
