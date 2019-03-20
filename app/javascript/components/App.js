import React, {useState, useEffect} from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useUserProvider } from "./Providers/UserProvider";
import Bar from "./Bar";
import Home from "./Home";
import JoinPage from "./JoinPage";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";
import ShowDetail from "./ShowDetail"

function App() {
  const userProvider = useUserProvider();
  const [mainButton, setMainButton] = useState(false)
  if (userProvider.initialLoading) {
    return <div>loading.....</div>;
  }
 
  if (userProvider.isLoggedIn) {
    return (
      <>
        <Bar buttonClick={setMainButton}/>
        <div style={{height: 64}} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/categories/:id?" component={CategoryPage} />
          <Route path="/items/:id" component={ShowDetail}/>
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Bar buttonClick={setMainButton}/>
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
