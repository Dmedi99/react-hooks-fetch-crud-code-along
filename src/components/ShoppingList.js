import React, { useState, useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Adding useEffect hook here 
  useEffect(()=>{
    fetch("http://localhost:4000/items")
      .then((r)=>r.json())
      .then((items) => setItems(items))
  }, [])

  //add this callback function and pass it down to Item 
  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=> item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  //add this callback function to call setItems in this component with a new list of items, where 
  //isInCart state of our updated item matches its state on the server 
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  //Add handleAddItem function 
  //We want to update the state in the ShoppingList component. 
  //The ShoppingList component is a parent component to the ItemForm component, we'll need to
  //pass a callback function as a prop so that ItemForm component can send the new item up to the 
  //ShoppingList 
  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* add the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
