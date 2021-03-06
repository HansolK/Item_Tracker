import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CategoryContext } from "./Providers/CategoryProvider";
import EditItemModal from "./EditItemModal";
import ItemModal from "./ItemModal";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import "./ItemPage.css";

function ItemPage(props) {
  const [currentInfo, setCurrentInfo] = useState("");
  const categoryProvider = useContext(CategoryContext);
  const itemProvider = useContext(ItemContext)
  const [itemModal, setItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  // useEffect(
  //   function() {
  //     fetch(`/api/categories/${props.categoryId}/items`)
  //       .then(res => res.json())
  //       .then(data => {
  //         categoryProvider.setItems(data.items);
          
  //       });
  //   },
  //   [props.categoryId]
  // );

  if (props.loading) {
    return (
      <div className="loading">
        <div className="loader" />
      </div>
    );
  }

  if (
    props.loading === false &&
    categoryProvider.getCategory(props.categoryId) === undefined
  ) {
    return <Redirect to="/categories" />;
  }

  return (
    <div>
      <div className="category_header">
        <h1>
          Explore categories{" "}
          {categoryProvider.getCategory(props.categoryId).name}
        </h1>
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
      <div>
        {categoryProvider.items.length === 0 ? (
          <p>You haven't added any items for this category</p>
        ) : (
          categoryProvider.items.map((item, index) => {
            return (
              <div key={index} className="item_page">
                <div className="edit_and_delete">
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
                      categoryProvider.deleteItem(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="item_wrapper" key={index}>
                  <p>Number: {index + 1}</p>
                  <p>Name: {item.name}</p>
                  <p>Rate: {item.rate}/10</p>
                  <p>Price: ${item.price}</p>
                  <p>Description: {item.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      {editItemModal && (
        <EditItemModal
          editItemModal={editItemModal}
          currentInfo={currentInfo}
          onClose={() => setEditItemModal(false)}
        />
      )}

      {itemModal && (
        <ItemModal
          itemModal={itemModal}
          onClose={() => setItemModal(false)}
          items={categoryProvider.items}
          setItems={categoryProvider.setItems}
          category={props.categoryId}
        />
      )}
    </div>
  );
}

export default ItemPage;
