import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "./components/Logout";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RoomPage from "./containers/RoomPage";
import RegisterPage from "./containers/RegisterPage";
import Profile from "./containers/Profile";
import VerifyEmailPage from './containers/VerifyEmailPage';
import ForgetPassPage from './containers/ForgetPassPage';
import SendEmail from './containers/ForgetPassPage/SendEmail';
import RoomDetails from './containers/RoomDetails';
import { AppContext } from "./contexts/AppContext";
import { TOKEN_NAME } from "./global/constants";
import decode from 'jwt-decode';
import Auth from "./components/Auth";
import socket from "./global/socket";
import RankingBoard from "./containers/RankingBoard";
import Loading from "./components/Loading";

function App() {
  const [isLogined, setIsLoginedState] = useState(localStorage.getItem(TOKEN_NAME) !== null);
  const [loading, setLoading] = useState(false);

  const setIsLogined = (value) => {
    setIsLoginedState(value);
  }

  useEffect(() => {

    const handleCloseTab = () => {
      if (localStorage.getItem(TOKEN_NAME) !== null) {
        const userInfo = decode(localStorage.getItem(TOKEN_NAME));
        socket.emit('update-status', { _id: userInfo._id, isOnline: false });
      }
    }

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      handleCloseTab();
    });

  }, []);

  return (
    <AppContext.Provider value={{ isLogined: isLogined, setIsLogined: setIsLogined, setLoading: setLoading }}>
      <div style={{ width: '100%', height: '100%' }}>
        {loading && <Loading />}
        <Switch>
          <Route exact path='/'>
            <Redirect to="/login" />
          </Route>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/home' component={HomePage} />
          <Route path='/logout' component={Logout} />
          <Route path='/room/:roomId' component={RoomPage} />
          <Route path='/oauth/:token' component={Auth} />
          <Route path='/profile' component={Profile} />
          <Route path='/mail-verification/:id' component={VerifyEmailPage} />
          <Route path='/reset-password/:id' component={ForgetPassPage} />
          <Route path='/forget-password' component={SendEmail} />
          <Route path='/review-room/:roomId' component={RoomDetails} />
          <Route path='/ranking' component={RankingBoard} />
        </Switch>
      </div>

    </AppContext.Provider>

  );
}

export default App;
