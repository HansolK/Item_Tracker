import React from 'react'
import {Link} from 'react-router-dom'
import { useUserProvider } from "./Providers/UserProvider";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Bar() {
  const { isLoggedIn, login, signOut } = useUserProvider()
  return( 
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
            Trackit
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