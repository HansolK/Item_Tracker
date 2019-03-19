import React from "react"
import {Link} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  drawer: {
    width: 200
  },
  drawerPaper: {
    width: 200,
  },
  toolbar: theme.mixins.toolbar,
});

function CategoryMenu(props) {
  return (
    <Drawer
      className={props.classes.drawer}
      variant="permanent"
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.toolbar}/>
      <List>
        {props.categories.map((category, index) => (
          <ListItem component={Link} to={`/categories/${category.id}`} button key={category.id}>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
  
    </Drawer>
  );
}


export default withStyles(styles)(CategoryMenu);