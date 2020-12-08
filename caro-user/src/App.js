import {useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "./components/Logout";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import { AppContext } from "./contexts/AppContext";
import { TOKEN_NAME } from "./global/constants";


function App() {
  const [isLogined, setIsLoginedState] = useState(localStorage.getItem(TOKEN_NAME) !== null);
  const setIsLogined = (value) => {
    setIsLoginedState(value);
  }
  return (
    <AppContext.Provider value={{isLogined: isLogined, setIsLogined: setIsLogined}}>
      <Switch>
          <Route exact path='/'>
              <Redirect to="/login" />
          </Route>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/home' component={HomePage}/>
          <Route path='/logout' component={Logout} />
      </Switch>      
    </AppContext.Provider>

  );
}

export default App;
