import {useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "./components/Logout";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RoomPage from "./containers/RoomPage";
import RegisterPage from "./containers/RegisterPage";
import { AppContext } from "./contexts/AppContext";
import { TOKEN_NAME } from "./global/constants";
import decode from 'jwt-decode';
import socket from "./global/socket";

function App() {
  const [isLogined, setIsLoginedState] = useState(localStorage.getItem(TOKEN_NAME) !== null);

  const setIsLogined = (value) => {
    setIsLoginedState(value);
  }

  useEffect(() => {

    const handleCloseTab = () => {
      if (localStorage.getItem(TOKEN_NAME) !== null){
        const userInfo = decode(localStorage.getItem(TOKEN_NAME));
        socket.emit('update-status', {_id: userInfo._id, isOnline: false});
      }
    }

    window.addEventListener("beforeunload", (ev) => 
    {  
      ev.preventDefault();
      handleCloseTab();
    });
  }, [])
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
          <Route path='/room/:roomId' component={RoomPage} />
      </Switch>      
    </AppContext.Provider>

  );
}

export default App;
