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


  const itemPost = (name, price, description, rate, category_id) => {
    api.post('/items', { name, price, description, rate, category_id })
      .then(data => {
        setCategoryItems([...categoryItems, data.item]);
      });
  };


  const editItem = (item) => {
    api.put(`/api/items/${item.id}`, item)
      .then(data => {
        setCategoryItems(
          categoryItems.map(item => {
            if (item.id === data.item.id) {
              return data.item;
            }
            return item;
          })
        );
      });
  };


  const deleteItem = id => {
    api.delete(`/api/items/${id}`, id)
      .then(data => setCategoryItems(data.item));
  };

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
        },
        itemPost,
        editItem,
        deleteItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
}

export { ItemProvider, ItemContext };
