import Add from "./Add";
import Footer from "./Footer";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function Item({ itemObj, onDelete, onCheck, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [newQuantity, setNewQuantity] = useState(itemObj.quantity);
  const [newName, setNewName] = useState(itemObj.name);

  const handleConfirmEdit = () => {
    onEdit(itemObj.id, newQuantity, newName);
    setEditMode(false);
  };
  return (
    <div className="Items">
      <p>{itemObj.quantity}</p>
      <p>{itemObj.name}</p>
      <div className="Items-Right">
        <input
          type="checkbox"
          checked={itemObj.isChecked}
          onChange={() => onCheck(itemObj.id)}
        />
        <button className="FontAwesome" onClick={() => onDelete(itemObj.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="FontAwesome" onClick={() => setEditMode(!editMode)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      {editMode && (
        <div className="EditPopup">
          <select
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            style={{ marginRight: "4px" }}
            className="fontselect"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="width"
          />
          <button className="EditPopupFontAwesome" onClick={handleConfirmEdit}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className="EditPopupFontAwesome"
            onClick={() => setEditMode(false)}
            style={{ fontSize: "medium" }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      )}
    </div>
  );
}

function ItemList() {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("input");

  const handleAddItem = (newItem) => {
    if (!newItem.name) {
      alert("Please enter a name for the item.");
      return;
    }
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure you want to clear?");
    if (confirmed) {
      setItems([]);
    }
  };
  const handleEditItem = (itemId, newQuantity, newName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, name: newName }
          : item
      )
    );
  };

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "name")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "isChecked")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));

  return (
    <div>
      <Add onAdd={handleAddItem} />
      <div className="items">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            itemObj={item}
            onDelete={handleDeleteItem}
            onCheck={handleCheckItem}
            onEdit={handleEditItem}
          />
        ))}
      </div>
      <div>
        <button className="Clear" onClick={handleClearList}>
          Clear
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="fontselect"
        >
          <option value="input">Sort by input</option>
          <option value="name">Sort by name</option>
          <option value="isChecked">Sort by checked</option>
        </select>
      </div>
      <div>
        <Footer items={items} />
      </div>
    </div>
  );
}

export default ItemList;
