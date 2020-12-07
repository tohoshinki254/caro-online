import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/LoginPage";

function App() {
  return (
    <Switch>
        <Route exact path='/'>
            <Redirect to="/login" />
        </Route>
        <Route path='/login' component={LoginPage} />
    </Switch>
  );
}

export default App;
