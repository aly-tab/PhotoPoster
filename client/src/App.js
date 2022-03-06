//import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter, 
  Switch,
  Route
} from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Search from './components/Search';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Account from './components/Account';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="https://photoposter.herokuapp.com/">
            <SignIn/>
          </Route>
          <Route exact path="https://photoposter.herokuapp.com/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/account">
            <Account/>
          </Route>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route exact path="/:username">
            <Profile/>
          </Route>
          <Route exact path="/:username/:id">
            <Detail/>
          </Route>
          <Route exact path="/:username/:id/edit">
            <Edit/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
