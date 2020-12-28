import { Route, Redirect, Switch } from 'react-router-dom'
import "./App.css";
import Main from "./components/main";
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Composition from './components/Composition';
import Me from './components/me';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path='/trending' component={Main} />
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/me' component={Me}/>
          <Route path='/:category/:id' component={Composition} />
          <Redirect exact from='/' to='/trending' />
        </Switch>
      </header>
    </div>
  );
}

export default App;
