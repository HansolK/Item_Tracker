import React, { useState, useEffect, useContext } from "react";
import {CategoryContext} from './Providers/CategoryProvider'
import "./CategoryPage.css";
import CategoryMenu from "./CategoryMenu";
import ItemPage from "./ItemPage";
import ListItem from "@material-ui/core/ListItem";
import ItemsTable from "./ItemsTable";
import { ItemContext } from "./Providers/ItemProvider";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
  const itemProvider = useContext(ItemContext)
  const categoryProvider = useContext(CategoryContext)

  useEffect(categoryProvider.getCategories, [])
  
  useEffect(function() {
    if(props.match.params.id) {
      itemProvider.categoryItems.fetch(props.match.params.id)
    } else {
      itemProvider.topFive.fetch()
    }
  }, [props.match.params.id]);
  
  if (categoryProvider.categories.length === 0) {
    return (
      <div>
        <CategoryMenu categories={categoryProvider.categories}/>
        <div className="starting_position">
          <h1>Let's start</h1>
          <p>Add a category for your items and add a new item!</p>
          <p>This is that easy!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <CategoryMenu categories={categoryProvider.categories}/>

      
      <ItemsTable
        items={props.match.params.id
          ? itemProvider.categoryItems.items
          : itemProvider.topFive.items
        }
      />
    </div>
  );
}

export default CategoryPage;
