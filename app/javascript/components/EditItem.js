import React, { useState, useContext } from "react";
import {CategoryContext} from './Providers/CategoryProvider'
import Button from "@material-ui/core/Button";

function EditItem(props) {
  const categoryProvider = useContext(CategoryContext);
  const [name, setName] = useState(props.currentInfo.name);
  const [price, setPrice] = useState(props.currentInfo.price);
  const [description, setDescription] = useState(props.currentInfo.description);
  const [rate, setRate] = useState(props.currentInfo.rate);
  const category_id = props.category_id
  const id = props.id
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          categoryProvider.editItem(id, name, price, description, rate, category_id)
        }}
      >
        <input type="hidden" name="category_id" value={props.category} />
        <div className="form">
          <label>Name:</label>
          <input
            onChange={e => setName(e.target.value)}
            name="name"
            type="text"
            value={name}
          />
          <label>Price:</label>
          <input
            onChange={e => setPrice(e.target.value)}
            name="price"
            value={price}
          />
          <label>Description:</label>
          <textarea
            onChange={e => setDescription(e.target.textContent)}
            name="description"
            type="text"
            value={description}
          />
          <label>Rate:</label>
          <input
            onChange={e => {
              setRate(e.target.value);
            }}
            name="rate"
            type="range"
            min="1"
            max="10"
            value={rate}
          />
        </div>
        <div className="submit_form_button">
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            type="submit"
          >
            Add This Item
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditItem;
