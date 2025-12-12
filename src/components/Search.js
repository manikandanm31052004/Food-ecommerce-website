import React, { useEffect, useState, useRef } from 'react';
import Fooddata from './FoodData';
import "./Style.css";
import Form from 'react-bootstrap/Form';
import Cards from './Cards';
import Set from './Set';
import Sidebar from './Sidebar';
import { FaUserCircle, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [copydata, setCopyData] = useState(Fooddata);
  const [searchText, setSearchText] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef(null);

  const logo = "images/GrabFood – Logo.jpeg";
  const navigate = useNavigate();

  const handleTypingSearch = (value) => {
    setSearchText(value);
    applySearchFilter(value);
  };

  const handleSearchClick = () => {
    applySearchFilter(searchText);
  };

  const applySearchFilter = (text) => {
    const filtered = text.trim() === ""
      ? Fooddata
      : Fooddata.filter((item) =>
          item.rname.toLowerCase().includes(text.toLowerCase())
        );
    setCopyData(filtered);
  };

  // Close contact dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setShowContact(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* NAV BUTTON */}
      <button className="nav-button" onClick={() => setSidebarOpen(true)}>☰</button>

      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: "20px", width: "100%" }}>
        {/* HEADER */}
        <div className="container d-flex justify-content-between align-items-center py-3">
          <img src={logo} style={{ width: "5rem", cursor: "pointer" }} alt="logo" />

          <div className="d-flex align-items-center gap-4" style={{ color: "#1b1464", cursor: "pointer" }}>
            <button
             style={{ background: "transparent", border: "none", fontSize: "20px" }} onClick={() => navigate("/customer-service")}>
                Customer Service
            </button>


            <button
              style={{
                background: "#f39c12",
                border: "none",
                fontSize: "18px",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontWeight: "500"
              }}
              onClick={() => navigate("/offers")}
            >
              <FaStar color="#fff" /> Special Offers
            </button>

            <div style={{ position: "relative" }} ref={contactRef}>
              <button
                style={{ background: "transparent", border: "none", fontSize: "20px" }}
                onClick={() => setShowContact(!showContact)}
              >
                Contact
              </button>

              {showContact && (
                <div className="contact-dropdown" style={{
                  position: "absolute",
                  top: "40px",
                  right: "0",
                  background: "#fff",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  zIndex: 10,
                  width: "200px"
                }}>
                  <p>📞 +91 9786713699</p>
                  <p>✉ mkfood@email.com</p>
                </div>
              )}
            </div>

            <FaUserCircle
              size={35}
              color="#262348ff"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            />
          </div>
        </div>

        {/* SEARCH */}
        <Form className='d-flex justify-content-center align-items-center mt-3'
              onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
          <Form.Group className="mx-2 col-lg-4">
            <Form.Control
              type="text"
              value={searchText}
              onChange={(e) => handleTypingSearch(e.target.value)}
              placeholder="Search your product from here"
            />
          </Form.Group>

          <button className='btn text-light col-lg-1' style={{ background: "#ed4c67" }}
                  onClick={handleSearchClick}>
            Search
          </button>
        </Form>

        {/* CARDS */}
        <section className='title'>
          <h2 className='px-4' style={{ fontWeight: 600, textAlign: "center" }}>
            Groceries Delivered in 90 Minutes
          </h2>
          <p style={{ textAlign: "center" }}>
            Get your healthy foods & snacks delivered at your doorsteps all day everyday
          </p>

          <div className="row mt-2 d-flex justify-content-around align-items-center">
            {copydata.length > 0
              ? <Cards data={copydata} />
              : <Set sdata={Fooddata} />}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;
