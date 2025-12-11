import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(""); // track selected option

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    console.log("Selected item:", event.target.value);
  };

  return (
    <div className="sidebar">
      <h3>Today Available Product</h3>

      {/* Fruits & Vegetables */}
      <label className="sidebar-label">Fruits & Vegetables</label>
      <select onChange={handleChange}>
        <option value="">--Items--</option>
        <option value="Apple">Apple</option>
        <option value="Baby Spinach">Baby Spinach</option>
        <option value="Blueberries">Blueberries</option>
        <option value="Brussels Sprout">Brussels Sprout</option>
        <option value="Celery Stick">Celery Stick</option>
        <option value="Clementines">Clementines</option>
        <option value="Sweet Corn">Sweet Corn</option>
        <option value="Cucumber">Cucumber</option>
        <option value="Tomato">Tomato</option>
      </select>

      {/* Meat & Fish */}
      <label className="sidebar-label">Meat & Fish</label>
      <select onChange={handleChange}>
        <option value="">--Items--</option>
        <option value="Chicken">Chicken</option>
        <option value="Mutton">Mutton</option>
        <option value="Fish">Fish</option>
      </select>

      {/* Snacks */}
      <label className="sidebar-label">Snacks</label>
      <select onChange={handleChange}>
        <option value="">--Items--</option>
        <option value="Chips">Chips</option>
        <option value="Biscuits">Biscuits</option>
        <option value="Nuts">Nuts</option>
      </select>

      {/* Display selected item */}
      {selectedItem && (
        <p className="selected-item">
          You selected: {selectedItem} is Available
        </p>
      )}
    </div>
  );
};

export default Sidebar;
