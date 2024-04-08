import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Add({ onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      quantity: parseInt(quantity),
      name,
      isChecked: false,
    };
    onAdd(newItem);
    // Reset the form fields
    setQuantity(1);
    setName("");
  };

  return (
    <div className="Add">
      <select
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginRight: "8px" }}
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
        name="AddContent"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "8px" }}
      />
      <button className="FontAwesome" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
export default Add;
