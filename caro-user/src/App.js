import {useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "./components/Logout";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RoomPage from "./containers/RoomPage";
import RegisterPage from "./containers/RegisterPage";
import { AppContext } from "./contexts/AppContext";
import { API_URL, TOKEN_NAME } from "./global/constants";
import socketIOClient from "socket.io-client";
import decode from 'jwt-decode';
import Auth from "./components/Auth";

function App() {
  const [isLogined, setIsLoginedState] = useState(localStorage.getItem(TOKEN_NAME) !== null);

  const setIsLogined = (value) => {
    setIsLoginedState(value);
  }

  useEffect(() => {
    const socket = socketIOClient(API_URL, {transports: ['websocket']});

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

  }, []);


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
          <Route path='/oauth/:token' component={Auth} />
      </Switch>      
    </AppContext.Provider>

  );
}

export default App;
