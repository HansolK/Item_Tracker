import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useUserProvider } from "./Providers/UserProvider";
import Bar from "./Bar";
import Home from "./Home";
import JoinPage from "./JoinPage";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";
import ShowDetail from "./ShowDetail";

function App() {
  const userProvider = useUserProvider();
  if (userProvider.initialLoading) {
    return (
      <div className="loading">
        <div className="loader" />
      </div>
    );
  }

  if (userProvider.isLoggedIn) {
    return (
      <>
        <Bar />
        <div style={{ height: 64 }} />
        <Switch>
          <Route path="/categories/:id?" component={CategoryPage} />
          <Route path="/items/:id" component={ShowDetail} />
          <Redirect to="/categories" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Bar />
      <Switch>
        <Route exact path="/" render={() => <LoginPage />} />
        <Route exact path="/login" render={() => <LoginPage />} />
        <Route exact path="/users/new" render={() => <JoinPage />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}
export default App;
