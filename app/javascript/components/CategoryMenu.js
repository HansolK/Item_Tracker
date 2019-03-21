import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { CategoryContext } from "./Providers/CategoryProvider";

const styles = theme => ({
  drawer: {
    width: 200
  },
  drawerPaper: {
    width: 200
  },
  toolbar: theme.mixins.toolbar
});

function CategoryMenu(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const categoryProvider = useContext(CategoryContext)
  if (props.categories === null) {
    return (
      <Drawer
        className={props.classes.drawer}
        variant="permanent"
        classes={{
          paper: props.classes.drawerPaper
        }}
      >
        <div className={props.classes.toolbar} />
        <List>
          <ListItem key={"add category"} button>
            <ListItemText
              onClick={e => setModalOpen(true)}
              primary="+ Add category"
            />
          </ListItem>
        </List>
        {modalOpen && (
          <AddCategoryModal
            modalOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}
      </Drawer>
    );
  }
  return (
    <Drawer
      className={props.classes.drawer}
      variant="permanent"
      classes={{
        paper: props.classes.drawerPaper
      }}
    >
      <div className={props.classes.toolbar} />
      <List>
        {props.categories.map((category, index) => {
          return (
            <ListItem
              className="category_menu_wrapper"
              component={Link}
              to={`/categories/${category.id}`}
              button
              key={category.id}
            >
              <ListItemText primary={category.name} />
              <IconButton
                aria-label="Delete"
                onClick={e => categoryProvider.deleteCategory(category.id)}
                className={`${props.classes.margin} delete_category`}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem key={"add category"} button>
          <ListItemText
            onClick={e => setModalOpen(true)}
            primary="+ Add category"
          />
        </ListItem>
      </List>
      {modalOpen && (
        <AddCategoryModal
          modalOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </Drawer>
  );
}

export default withStyles(styles)(CategoryMenu);
