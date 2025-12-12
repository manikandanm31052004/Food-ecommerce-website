import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Fooddata from "./FoodData";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let p = location.state;

    if (!p && params.id) {
      const id = parseInt(params.id, 10);
      p = Fooddata.find((f) => f.id === id);
    }

    if (p) {
      setProduct(p); // prices are already numeric
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find((c) => c.id === p.id);
      if (item) setQty(item.qty);
    }

    setLoading(false);
  }, [location.state, params]);

  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  const saveToCart = () => {
    const cart = getCart();
    const idx = cart.findIndex((c) => c.id === product.id);

    if (idx !== -1) {
      cart[idx].qty = qty;
    } else {
      cart.push({
        id: product.id,
        rname: product.rname,
        imgdata: product.imgdata,
        price: product.price,
        qty: qty,
      });
    }

    saveCart(cart);
  };

  const removeFromCart = () => {
    const cart = getCart().filter((c) => c.id !== product.id);
    saveCart(cart);
    setQty(1);
    navigate("/");
  };

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const totalPrice = product.price * qty;
  const inCart = getCart().find((c) => c.id === product.id);

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 30 }}>
        <img
          src={product.imgdata}
          style={{ width: 320, height: 220, borderRadius: 10, objectFit: "cover" }}
        />

        <div>
          <h2>{product.rname}</h2>
          <p>{product.address}</p>

          <h3 style={{ color: "#1b1464" }}>
            ₹{totalPrice}{" "}
            <span style={{ fontSize: 14 }}>
              (₹{product.price} × {qty})
            </span>
          </h3>

          <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
            <button className="btn btn-outline-secondary" onClick={decrease}>
              -
            </button>
            <div style={{ fontSize: 20 }}>{qty}</div>
            <button className="btn btn-outline-secondary" onClick={increase}>
              +
            </button>
          </div>

          <div style={{ marginTop: 25, display: "flex", gap: 12 }}>
            <button
              className="btn btn-danger"
              onClick={() => {
                saveToCart();
                navigate("/");
              }}
            >
              Checkout
            </button>

            {inCart ? (
              <button className="btn btn-outline-danger" onClick={removeFromCart}>
                Remove from Cart
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  saveToCart();
                  navigate(`/product/${product.id}`, { state: product }); // ✅ FIXED
                }}
              >
                Save to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
