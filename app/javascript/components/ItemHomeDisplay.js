import React, { useState, useEffect, useContext } from "react";

function ItemHomeDisplay(props) {
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

  return (
    <div>
      {items.data && props.mainProp.match.params.id === undefined ? (
        items.data.length > 0 ? (
          <div>
            <h1>Your most loved items</h1>
            {descendingOrder.slice(0, 5).map((item, index) => {
              return (
                <div className="item_wrapper">
                  <h4>Number {index + 1}</h4>
                  <p>Name: {item.name}</p>
                  <p>Rate: {item.rate}</p>
                  <p>Price: ${item.price}</p>
                  <p>Description: {item.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>You haven't purchase anything yet</div>
        )
      ) : (
        undefined
      )}
    </div>
  );
}

export default ItemHomeDisplay;
