import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import CompanyPage from "./pages/CompanyPage";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      {/* Navbar pulled out, because of styling reasons bg image */}
      <Navbar handleLogout={handleLogout} user={user} />
      <Switch>
        <NormalRoute
          exact
          path={PATHS.HOMEPAGE}
          component={HomePage}
          handleLogout={handleLogout}
          user={user}
        />
        <NormalRoute
          exact
          path={PATHS.SIGNUPPAGE}
          authenticate={authenticate}
          component={Signup}
        />
        <NormalRoute
          exact
          path={PATHS.LOGINPAGE}
          authenticate={authenticate}
          component={LogIn}
        />
        <ProtectedRoute
          exact
          path={PATHS.PROFILEPAGE}
          component={ProfilePage}
          user={user}
          authenticate={authenticate}
        />

        <ProtectedRoute
          exact
          path={PATHS.CREATEPAGE}
          component={CreatePage}
          user={user}
        />
        <NormalRoute
          exact
          path={PATHS.SINGLECOMPANYPAGE}
          component={CompanyPage}
          user={user}
          setUser={setUser}
          authenticate={authenticate}
        />
      </Switch>
    </div>
  );
}
