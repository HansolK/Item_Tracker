import React from 'react'
import './App.css'
import {Link, Route, Switch} from 'react-router-dom'
import Home from './Home'
import JoinPage from './JoinPage'
import CategoryPage from './CategoryPage'
import LoginPage from './LoginPage'
import CategoryForm from './CategoryForm'
import ItemPage from './ItemPage'

class App extends React.Component {
  render () {
    return (
     
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} /> 
          <Route exact path="/login" render={() => <LoginPage />} /> 
          <Route exact path="/users/new" render={() => <JoinPage />} />
          <Route path="/categories/:id?" component={CategoryPage} /> 
        </Switch>
       
      </div>
    ) 
  } 
}  
export default App