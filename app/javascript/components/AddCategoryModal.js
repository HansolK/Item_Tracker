import React, {useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
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
  }
});

function AddCategoryModal(props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  };
  
  const handleClose = () => {
    setOpen(false)
  };
  
  return (
    <Modal  
    open={open}
    onClose={handleClose}
    >
      <div style={getModalStyle()} className={props.classes.paper}>
        <Typography variant="h6" id="modal-title">
          Add a new Category
        </Typography>
        <label>Name: </label>
        <input/>
        <AddCategoryModal />
      </div>
    </Modal>
  );
}

export default withStyles(styles)(AddCategoryModal);