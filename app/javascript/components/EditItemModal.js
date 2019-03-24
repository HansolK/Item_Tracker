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
import { ItemContext } from "./Providers/ItemProvider";

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


function EditItemModal({onClose, item: originalItem, classes}) {
  const categoryProvider = useContext(CategoryContext);
  const itemProvider = useContext(ItemContext)
  const [item, setItem] = useState(originalItem)
  console.log(item)
  const id = item.id
  const category_id = item.category_id

  const updateItem = (newStuff) => {
    setItem({
      ...item,
      ...newStuff
    })
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={() => onClose()}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form
            onSubmit={e => {
              e.preventDefault();
              onClose();
              itemProvider.editItem(item)
            }}
          >
            <TextField
              id="standard-name"
              label="Name"
              value={item.name}
              onChange={e => updateItem({name: e.target.value})}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Price"
              value={item.price}
              onChange={e => updateItem({price:e.target.value})}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Description"
              value={item.description}
              onChange={e => updateItem({description: e.target.value})}
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
              value={item.rate}
              min={0}
              max={10}
              step={1}
              onChange={(_, newValue) => {
                updateItem({rate: newValue})
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
