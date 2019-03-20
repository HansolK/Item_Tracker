import React from 'react'
import {Link} from 'react-router-dom'
import { useUserProvider } from "./Providers/UserProvider";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function Bar(props) {
  const { isLoggedIn, login, signOut } = useUserProvider()
  
  return( 
    <AppBar position="fixed" className="topnav">
      <Toolbar>
        <Typography
         variant="h6" 
         color="inherit">
            <Link to="/">Track what you have experienced</Link>
        </Typography>
        {isLoggedIn && <Button 
        onClick={() => {
          signOut()
        }}
        color="inherit">Log out</Button>}
        {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Bar