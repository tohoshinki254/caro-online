import { Redirect, Route, Switch } from "react-router-dom";
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
    </Switch>
  );
}

export default App;
