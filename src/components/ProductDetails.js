import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Fooddata from "./FoodData"; // adjust path if needed

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Product can arrive via location.state when navigated from Cards,
  // or we can fall back to Fooddata using the :id route param.
  const initialProduct = location.state || null;

  const [product, setProduct] = useState(initialProduct);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Load product (if not provided via state)
  useEffect(() => {
    if (product) {
      setLoading(false);
      // if product exists in cart, set qty from cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const found = cart.find((c) => c.id === product.id);
      if (found) setQty(found.qty);
      return;
    }

    // if no product in location.state, try to load by :id
    if (params && params.id) {
      const id = parseInt(params.id, 10);
      const foundItem = Fooddata.find((f) => f.id === id);
      if (foundItem) {
        setProduct(foundItem);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const found = cart.find((c) => c.id === id);
        if (found) setQty(found.qty);
      }
    }

    setLoading(false);
  }, [location.state, params, product]);

  // helper: get cart array
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

  // helper: save cart array
  const saveCart = (cartArr) => {
    localStorage.setItem("cart", JSON.stringify(cartArr));
  };

  // Save/update this product in cart with current qty
  const saveToCart = () => {
    if (!product) return;
    const cart = getCart();
    const idx = cart.findIndex((c) => c.id === product.id);

    if (idx !== -1) {
      // update qty
      cart[idx] = { ...cart[idx], qty };
    } else {
      // push minimal product info + qty
      cart.push({ id: product.id, qty, rname: product.rname, price: product.price, imgdata: product.imgdata });
    }

    saveCart(cart);
  };

  // Remove this product from cart
  const removeFromCart = () => {
    if (!product) return;
    const cart = getCart();
    const updated = cart.filter((c) => c.id !== product.id);
    saveCart(updated);
    // update UI: set qty to 1 and maybe provide feedback
    setQty(1);
    // optional: stay on page but show removed state; we'll stay but disable remove if not in cart
    // if you prefer to go home after removal, uncomment the next line:
    // navigate("/");
  };

  // Checkout: save/update cart then go home
  const handleCheckout = () => {
    saveToCart();
    navigate("/");
  };

  // Increase / decrease qty safely
  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 30 }}>Product not found</div>;

  // Check whether product currently exists in cart
  const inCart = getCart().find((c) => c.id === product.id);

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        <img
          src={product.imgdata}
          alt={product.rname}
          style={{ width: 320, height: 220, objectFit: "cover", borderRadius: 10 }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{product.rname}</h2>
          <p style={{ margin: "6px 0" }}>{product.address}</p>
          <h3 style={{ color: "#1b1464" }}>{product.price}</h3>

          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn btn-outline-secondary" onClick={decrease} disabled={qty <= 1}>-</button>
            <div style={{ fontSize: 20, minWidth: 40, textAlign: "center" }}>{qty}</div>
            <button className="btn btn-outline-secondary" onClick={increase}>+</button>
          </div>

          <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
            <button
              className="btn"
              style={{ background: "#ed4c67", color: "white" }}
              onClick={handleCheckout}
            >
              Checkout
            </button>

            {/* Remove button (visible only if item is already in cart) */}
            {inCart ? (
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  removeFromCart();
                  // small UX improvement: navigate home after removal so user sees cart cleared
                  // If you prefer staying, comment the next line out
                  navigate("/");
                }}
              >
                Remove from Cart
              </button>
            ) : (
              // If not in cart, show 'Save' to add without navigating away
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  saveToCart();
                  // refresh inCart state by forcing re-render (we set qty so UI shows Add as in-cart)
                  // navigate not required; we just update localStorage and stay
                  // But to show immediate Remove button, we can navigate to same page to re-mount:
                  navigate(`/product/${product.id}`, { state: product });
                }}
              >
                Save to Cart
              </button>
            )}
          </div>

          <div style={{ marginTop: 18 }}>
            <small style={{ color: "#666" }}>
              {inCart ? `This item is in cart (qty: ${inCart.qty}).` : "This item is not in cart yet."}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
