import React, { useState, useEffect, useContext } from "react";
import {Redirect} from 'react-router-dom';
import { CategoryContext } from "./Providers/CategoryProvider";
import "./CategoryPage.css";
import CategoryMenu from "./CategoryMenu";
import ItemPage from "./ItemPage";
import ListItem from "@material-ui/core/ListItem";
import ItemModal from "./ItemModal";
import ItemsTable from "./ItemsTable";
import { ItemContext } from "./Providers/ItemProvider";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
  const itemProvider = useContext(ItemContext);
  const categoryProvider = useContext(CategoryContext);
  const [itemModal, setItemModal] = useState(false);
  const categoryId = props.match.params.id;

  useEffect(categoryProvider.getCategories, []);

  useEffect(
    function() {
      if (categoryId) {
        itemProvider.categoryItems.fetch(categoryId);
      } else {
        itemProvider.topFive.fetch();
      }
    },
    [categoryId]
  );

  if (categoryId && categoryProvider.categories.length && categoryProvider.getCategory(categoryId) === undefined) {
    return <Redirect to="/categories" />;
  }

  if (categoryProvider.categories.length === 0) {
    return (
      <div className="content" >
        <CategoryMenu categories={categoryProvider.categories} />
        <div className="starting_position">
          <h1>Let's start</h1>
          <p>Add a category for your items and add a new item!</p>
          <p>This is that easy!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <CategoryMenu categories={categoryProvider.categories} />
      <div style={{ flex: 1 }}>
        <div className="category_header">
          <h1>
            {categoryId
              ? `Explore ${categoryProvider.getCategory(categoryId).name}`
              : "Top five items"}
          </h1>
          {categoryId && (
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
          )}

          {itemModal && (
            <ItemModal
              itemModal={itemModal}
              onClose={() => setItemModal(false)}
              items={categoryProvider.items}
              setItems={categoryProvider.setItems}
              category={categoryId}
            />
          )}
        </div>
        <ItemsTable
          items={
            categoryId
              ? itemProvider.categoryItems.items
              : itemProvider.topFive.items
          }
          showControls={Boolean(categoryId)}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
