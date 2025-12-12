import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Cards = ({ data }) => {
  const navigate = useNavigate();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ADD TO CART FUNCTION
  const addToCart = (item) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cartData.find((i) => i.id === item.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cartData.push({
        ...item,
        price: Number(item.price),
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Navigate to product page
  const openProductPage = (item) => {
    navigate(`/product/${item.id}`, { state: item });   // ✅ FIXED
  };

  return (
    <>
      {data.map((element) => {
        const itemInCart = cart.find((i) => i.id === element.id);

        return (
          <Card
            key={element.id}
            style={{ width: "22rem", border: "none" }}
            className="hove mb-4"
          >
            <div className="image_box">
              <Card.Img variant="top" className="cd" src={element.imgdata} />

              <button
                className="cart_btn"
                onClick={() => {
                  addToCart(element);
                  openProductPage(element);
                }}
              >
                {itemInCart
                  ? `Add to Cart (${itemInCart.qty})`  // ✅ FIXED
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
                <span>₹ {element.price}</span>
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
