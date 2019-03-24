import React, { useState, createContext } from "react";
import api from '../../api'
const ItemContext = createContext({});


function ItemProvider(props) {
  const [topFive, setTopFive] = useState([])
  const [topFiveStatus, setTopFiveStatus] = useState({loading: false, error: false})
  const getTopFive = () => {
    setTopFiveStatus({loading: true})
    api.get("/api/items")
    .then(data => {
      setTopFiveStatus({loading: false})
      if (data.items.length > 0) {
          setTopFive(data.items.sort((a, b) => (a.rate > b.rate ? -1 : 1)).slice(0, 5))
        } else {
          setTopFive([]);
        }
    })
  }

  const [categoryItems, setCategoryItems] = useState([])
  const [categoryItemsStatus, setCategoryItemsStatus] = useState({loading: false, error: false})

  const getCategoryItems = (categoryId) => {
    setCategoryItemsStatus({loading: true})
    api.get(`/api/categories/${categoryId}/items`)
      .then(data => {
        setCategoryItems(data.items);
        setCategoryItemsStatus({loading: false})
      });
  }

  return (
    <ItemContext.Provider
      value={{
        topFive: {
          items: topFive,
          fetch: getTopFive,
          status: topFiveStatus
        },
        categoryItems: {
          items: categoryItems,
          fetch: getCategoryItems,
          status: categoryItemsStatus
        }
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
}

export { ItemProvider, ItemContext };
