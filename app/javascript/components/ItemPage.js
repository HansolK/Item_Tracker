import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "./Providers/CategoryProvider";
import {Link} from 'react-router-dom'
import RateBar from "./RateBar";
import EditItem from "./EditItem";
import NewItem from "./NewItem";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import "./ItemPage.css";

function ItemPage(props) {
  const [currentInfo, setCurrentInfo] = useState("");
  const categoryProvider = useContext(CategoryContext);
  const [editButton, setEditbutton] = useState(false);
  const [addItem, setAddItem] = useState(false);

  useEffect(
    function() {
      fetch(`/api/categories/${props.selectedCategory}`)
        .then(res => res.json())
        .then(data => {
          categoryProvider.setItems(data.items);
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
            setAddItem(true);
          }}
          variant="contained"
          size="medium"
          color="primary"
        >
          <AddIcon />
          Add item
        </Button>
      </div>

      {categoryProvider.items === [] ? (
        <p>Nothing</p>
      ) : (
        categoryProvider.items.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={e => {
                  setCurrentInfo(item);
                  setEditbutton(true);
                }}
              >
                Edit
              </button>
              <p>Name: {item.name}</p>
              <p>Rate: {item.rate}</p>
              <p>Price: ${item.price}</p>
              <p>Description: {item.description}</p>
            </div>
          );
        })
      )}
      {editButton && <EditItem currentInfo={currentInfo} />}

      {addItem ? (
        <NewItem
          items={categoryProvider.items}
          setItems={categoryProvider.setItems}
          category={props.selectedCategory}
        />
      ) : (
        ""
      )}

    </div>
  );
}

export default ItemPage;
