import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState({
    fruits: "",
    meat: "",
    snacks: "",
  });

  const handleChange = (category) => (event) => {
    setSelectedItems((prev) => ({ ...prev, [category]: event.target.value }));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>×</button>

      {/* Title placed below menu button */}
      <h3 className="sidebar-title">Today Available Products</h3>

      {/* Category 1 */}
      <div className="category-block">
        <label className="sidebar-label">Fruits & Vegetables</label>
        <select className="sidebar-select" onChange={handleChange("fruits")}>
          <option value="">--Select Item--</option>
          <option value="Apple">Apple</option>
          <option value="Baby Spinach">Baby Spinach</option>
          <option value="Blueberries">Blueberries</option>
          <option value="Brussels Sprout">Brussels Sprout</option>
          <option value="Celery Stick">Celery Stick</option>
          <option value="Clementines">Clementines</option>
          <option value="Sweet Corn">Sweet Corn</option>
          <option value="Cucumber">Cucumber</option>
        </select>
        {selectedItems.fruits && (
          <p className="selected-item">
            You selected: <strong>{selectedItems.fruits}</strong> is Available
          </p>
        )}
      </div>

      {/* Category 2 */}
      <div className="category-block">
        <label className="sidebar-label">Meat & Fish</label>
        <select className="sidebar-select" onChange={handleChange("meat")}>
          <option value="">--Select Item--</option>
          <option value="Egg">Egg</option>
          <option value="Chicken">Chicken</option>
          <option value="Mutton">Mutton</option>
          <option value="Fish">Fish</option>
        </select>
        {selectedItems.meat && (
          <p className="selected-item">
            You selected: <strong>{selectedItems.meat}</strong> is Available
          </p>
        )}
      </div>

      {/* Category 3 */}
      <div className="category-block">
        <label className="sidebar-label">Snacks</label>
        <select className="sidebar-select" onChange={handleChange("snacks")}>
          <option value="">--Select Item--</option>
          <option value="Chips">Chips</option>
          <option value="Biscuits">Biscuits</option>
          <option value="Nuts">Nuts</option>
          <option value="Popcorn">Popcorn</option>
        </select>
        {selectedItems.snacks && (
          <p className="selected-item">
            You selected: <strong>{selectedItems.snacks}</strong> is Available
          </p>
        )}
      </div>

      {/* Help & Settings */}
      <h3 className="sidebar-title">Help & Settings</h3>
      <button style={{ background: "transparent", border: "none", fontSize: "17px",marginBottom: "15px" }}>
        Your Account
      </button>
      <br />
      <button style={{ background: "transparent", border: "none", fontSize: "17px" ,marginBottom: "15px"}}>
        Customer Service
      </button>
      <br />
      <button style={{ background: "transparent", border: "none", fontSize: "17px",marginBottom: "15px" }}>
        Sign in
      </button>
    </div>
  );
};

export default Sidebar;
