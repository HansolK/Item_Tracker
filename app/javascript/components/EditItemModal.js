import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "./Providers/CategoryProvider";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Slider from '@material-ui/lab/Slider';
import { InputLabel } from "@material-ui/core";

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
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


function EditItemModal({onClose, currentInfo, editItemModal, classes}) {
  const categoryProvider = useContext(CategoryContext);
  const [name, setName] = useState(currentInfo.name);
  const [price, setPrice] = useState(currentInfo.price);
  const [description, setDescription] = useState(currentInfo.description);
  const [rate, setRate] = useState(currentInfo.rate);
  const id = currentInfo.id
  const category_id = currentInfo.category_id
  useEffect(function() {
    setName(currentInfo.name)
    setPrice(currentInfo.price)
    setDescription(currentInfo.description)
    setRate(currentInfo.rate)
  }, [currentInfo])

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={editItemModal}
        onClose={() => onClose()}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form
            onSubmit={e => {
              e.preventDefault();
              onClose();
              categoryProvider.editItem(id, name, price, description, rate, category_id)
            }}
          >
            <TextField
              id="standard-name"
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <InputLabel 
            id="slider-image"
            >
            Rate</InputLabel>
            <Slider
              margin="normal"
              style={{padding: '22px 0px'}}
              value={rate}
              min={0}
              max={10}
              step={1}
              onChange={(_, newValue) => {
                setRate(newValue)
              }}
            />
            <Button type="submit" className={classes.button}>
              Edit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

EditItemModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(EditItemModal);
