import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useUserProvider } from "./Providers/UserProvider";
import Bar from "./Bar";
import Home from "./Home";
import JoinPage from "./JoinPage";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";

function App() {
  const userProvider = useUserProvider();
  if (userProvider.initialLoading) {
    return <div>loading.....</div>;
  }

  if (userProvider.isLoggedIn) {
    return (
      <>
        <Bar />
        <div style={{height: 64}} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/categories/:id?" component={CategoryPage} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Bar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/login" render={() => <LoginPage />} />
        <Route exact path="/users/new" render={() => <JoinPage />} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
}
export default App;
