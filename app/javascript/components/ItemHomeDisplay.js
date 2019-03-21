import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "./Providers/CategoryProvider";

function ItemHomeDisplay(props) {
  const categoryProvider = useContext(CategoryContext);
  const [items, setItems] = useState({});
  let descendingOrder = items.data
    ? items.data.sort((a, b) => (a.rate > b.rate ? 1 : -1))
    : undefined;

  useEffect(function() {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => {
        if (data.items.length > 0) {
          setItems({ data: data.items });
        } else {
          setItems({});
        }
      });
  }, []);

  if (categoryProvider.categories.length === 0) {
    return (
      <div className="starting_position">
        <h1>Let's start</h1>
        <p>Add a category for your items and add a new item!</p>
        <p>This is that easy!</p>
      </div>
    );
  }

  return (
    <div>
      {items.data ? (
        <div>
          <h1>Your most loved items</h1>
          <div className="item_wrapper">
            <p>Rank</p>
            <p>Name</p>
            <p>Rate</p>
            <p>Price</p>
            <p>Description</p>
          </div>
          {descendingOrder.slice(0, 5).map((item, index) => {
            return (
              <div key={index} className="item_wrapper">
                <p>{index + 1}</p>
                <p>{item.name}</p>
                <p>{item.rate}/10</p>
                <p>${item.price}</p>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>No items</h1>
          <p>Why don't you add one? Click a category and add an item</p>
        </div>
      )}
    </div>
  );
}

export default ItemHomeDisplay;
