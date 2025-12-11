import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Cards = ({ data }) => {
  const navigate = useNavigate();

  // Get cart array from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Open product details page
  const openProductPage = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  return (
    <>
      {data.map((element) => {
        
        // Check if this product is already in cart
        const itemInCart = cart.find((i) => i.id === element.id);

        return (
          <Card
            key={element.id}
            style={{ width: "22rem", border: "none" }}
            className="hove mb-4"
          >
            <div className="image_box">
              <Card.Img
                variant="top"
                className="cd"
                src={element.imgdata}
              />

              {/* CART BUTTON */}
              <button
                className="cart_btn"
                onClick={() => openProductPage(element)}
              >
                {itemInCart
                  ? `Add to Cart (${itemInCart.qty})`
                  : "Add to Cart"}
              </button>
            </div>

            <div className="card_body">
              <div className="upper_data d-flex justify-content-between">
                <h4>{element.rname}</h4>
                <span>{element.rating} ★</span>
              </div>

              <div className="lower_data d-flex justify-content-between">
                <h5>{element.address}</h5>
                <span>{element.price}</span>
              </div>

              <div className="extra"></div>

              <div className="last_data d-flex justify-content-between">
                <img src={element.arrimg} className="limg" alt="" />
                <p>{element.somedata}</p>
                <img src={element.delimg} className="laimg" alt="" />
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default Cards;
