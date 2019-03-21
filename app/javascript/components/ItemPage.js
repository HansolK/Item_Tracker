import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "./Providers/CategoryProvider";
import EditItemModal from "./EditItemModal";
import ItemModal from './ItemModal'
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import "./ItemPage.css";

function ItemPage(props) {
  const [currentInfo, setCurrentInfo] = useState("");
  const categoryProvider = useContext(CategoryContext);
  const [itemModal, setItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
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
            setItemModal(true);
          }}
          variant="contained"
          size="medium"
          color="primary"
        >
          <AddIcon />
          Add item
        </Button>
      </div>

      {categoryProvider.items.length === 0 ? (
        <p>Nothing</p>
      ) : (
        categoryProvider.items.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={e => {
                  setCurrentInfo(item);
                  setEditItemModal(true);
                }}
              >
                Edit
              </button>
              <button
              onClick={e => {
                categoryProvider.deleteItem(item.id)
              }}
              >
              Delete
              </button>
              <p>Name: {item.name}</p>
              <p>Rate: {item.rate}</p>
              <p>Price: ${item.price}</p>
              <p>Description: {item.description}</p>
            </div>
          );
        })
      )}
      {editItemModal && <EditItemModal editItemModal={editItemModal} currentInfo={currentInfo} onClose={() => setEditItemModal(false)}/>}

      {itemModal && (
        <ItemModal
          itemModal={itemModal}
          onClose={() => setItemModal(false)}
          items={categoryProvider.items}
          setItems={categoryProvider.setItems}
          category={props.selectedCategory}
        />
      )}

    </div>
  );
}

export default ItemPage;
