import React from 'react'
import {Link, Router, Switch} from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Router exact path="/users/new" render={() => <JoinPage />} />
        </Switch>
        <h1>TRACKIT</h1>
        <Link to="/users/new">Join</Link>
        <Link to="">Login</Link>
      </div>
    ) 
  } 
}  
export default App