import './App.css';
import Login from './Components/login';
import Home from './Components/Home'
import Admin from './Components/Admin';
import NotFound from './Components/NotFound';
import {Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
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
