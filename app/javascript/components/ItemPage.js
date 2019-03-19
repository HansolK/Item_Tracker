import React, { useState, useEffect } from "react";
import NewItem from "./NewItem";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import './ItemPage.css'

function ItemPage(props) {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);

  useEffect(
    function() {
      fetch(`/api/categories/${props.selectedCategory}`)
        .then(res => res.json())
        .then(data => {
          setItems(data.items);
        });
    },
    [props.selectedCategory]
  );

  return (
    <div>
      <div className="category_header">
        <h1>Explore categories</h1>
        <Button 
        onClick={() => {
          setAddItem(true)
        }}
        variant="contained" size="medium" color="primary">
          <AddIcon />
            Add item
        </Button>
      </div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.rate}</p>
          </div>
        );
      })}
      {addItem ? <NewItem category={props.selectedCategory} /> : ""}
    </div>
  );
}

export default ItemPage;
