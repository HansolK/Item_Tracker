import React, { useState,useContext } from "react";
import {UserContext} from './Providers/UserProvider'
import {CategoryContext} from './Providers/CategoryProvider'
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  return {
    transform: `translate(50%, 50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

function SimpleModal(props) {
  const userProvider = useContext(UserContext);
  const [categoryName, setCategoryName] = useState("");
  const categoryProvider = useContext(CategoryContext);
  const { classes } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.modalOpen}
        onClose={e => props.onClose()}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form onSubmit={e => {
            e.preventDefault()
            props.onClose()
            categoryProvider.createCategory(categoryName)
          }}>
            <TextField
              id="standard-name"
              label="Name"
              value={categoryName}
              className={classes.textField}
              onChange={e => setCategoryName(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <Button
              type="submit"
              className={classes.button}
            >
              Create
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;

// import React, {useState} from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

// const styles = theme => ({
//   paper: {
//     position: "absolute",
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//     outline: "none"
//   }
// });

// function AddCategoryModal(props) {
//   const [open, setOpen] = useState(false)

//   const handleOpen = () => {
//     setOpen(true)
//   };

//   const handleClose = () => {
//     setOpen(false)
//   };

//   return (
//     <>
//     <button onClick={() => setOpen(true)}>open it</button>
//     <Modal
//     open={open}
//     onClose={handleClose}
//     >
//       <div style={getModalStyle()} >
//         <Typography variant="h6" id="modal-title">
//           Add a new Category
//         </Typography>
//         <label>Name: </label>
//         <input/>
//         <AddCategoryModal />
//       </div>
//     </Modal>
//     </>
//   );
// }

// export default withStyles(styles)(AddCategoryModal);
