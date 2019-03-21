import React, { useState, useEffect, useContext } from "react";
import {CategoryContext} from './Providers/CategoryProvider'
import "./CategoryPage.css";
import CategoryMenu from "./CategoryMenu";
import ItemHomeDisplay from "./ItemHomeDisplay";
import ItemPage from "./ItemPage";
import ListItem from "@material-ui/core/ListItem";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function CategoryPage(props) {
  const categoryProvider = useContext(CategoryContext)
  useEffect(categoryProvider.getCategories, [])
  
  return (
    <div style={{ display: "flex" }}>
      <CategoryMenu categories={categoryProvider.categories}/>
      <div className="item_content">
        {props.match.params.id ? (
          <ItemPage selectedCategory={props.match.params.id} />
        ) : <ItemHomeDisplay mainProp={props}/>}

      </div>
    </div>
  );
}

export default CategoryPage;
