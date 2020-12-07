import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";

function App() {
  return (
    <Switch>
        <Route exact path='/'>
            <Redirect to="/login" />
        </Route>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/home' component={HomePage}/>
    </Switch>
  );
}

export default App;
