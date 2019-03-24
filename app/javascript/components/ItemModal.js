import React, { useState, useContext } from "react";
import { CategoryContext } from "./Providers/CategoryProvider";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";
import { InputLabel } from "@material-ui/core";
import { ItemContext } from "./Providers/ItemProvider";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
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

function ItemModal(props) {
  const categoryProvider = useContext(CategoryContext);
  const itemProvider = useContext(ItemContext)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const category_id = props.category;
  const { classes } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.itemModal}
        onClose={e => props.onClose()}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form
            onSubmit={e => {
              e.preventDefault();
              setFormSubmitted(true);
              
              if (name !== "" && price !== "" && description !== "") {
                props.onClose();
                itemProvider.itemPost(
                  name,
                  price,
                  description,
                  rate,
                  category_id
                );
              }
            }}
          >
            <TextField
              id="standard-name"
              label="Name"
              value={name}
              error={formSubmitted && name === ""}
              onChange={e => setName(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Price"
              value={price}
              error={formSubmitted && price === ""}
              onChange={e => setPrice(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Description"
              value={description}
              error={formSubmitted && description === ""}
              onChange={e => setDescription(e.target.value)}
              fullWidth={true}
              margin="normal"
            />
            <InputLabel id="slider-image">Rate</InputLabel>
            <Slider
              margin="normal"
              style={{ padding: "22px 0px" }}
              value={rate}
              min={0}
              max={10}
              step={1}
              onChange={(_, newValue) => {
                setRate(newValue);
              }}
            />
            <Button type="submit" className={classes.button}>
              Create
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

ItemModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(ItemModal);
