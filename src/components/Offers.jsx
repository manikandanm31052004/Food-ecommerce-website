import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Offers = () => {
  const navigate = useNavigate();

  const offerImages = [
    "/offer images/Canva Food Poster Design Ideas 🍩.jpeg",
    "/offer images/Christmas creative Ads design.jpeg",
    "/offer images/creative ad.jpeg"
  ];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)", // semi-transparent overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "900px",
        padding: "20px",
        position: "relative",
        maxHeight: "90%",
        overflowY: "auto"
      }}>
        {/* Cancel / Close Icon */}
        <FaTimes
          size={30}
          style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer" }}
          onClick={() => navigate("/")} // Back to home
        />

        <h1 style={{ textAlign: "center" }}>New Year Special Offers</h1>
        <p style={{ textAlign: "center" }}>Check out our latest offers and discounts!</p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}>
          {offerImages.map((img, index) => (
            <div key={index} style={{
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <img
                src={img}
                alt={`Offer ${index + 1}`}
                style={{ width: "165%", height: "500px", objectFit: "cover" }}
              />
              <p style={{ padding: "10px", fontWeight: "500", textAlign: "center" }}>Offer {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
