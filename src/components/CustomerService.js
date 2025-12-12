import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

const CustomerService = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save or send data (here we just show a confirmation)
    console.log("Customer message submitted:", formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Customer Service</h1>

      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Contact Info */}
        <div style={{ flex: "1 1 300px", minWidth: 300 }}>
          <h2>Contact Us</h2>
          <p>
            <FaPhone /> Phone: +91 9786713699
          </p>
          <p>
            <FaEnvelope /> Email: mkfood@email.com
          </p>
          <p>
            <FaQuestionCircle /> FAQ: Check our FAQ section for common queries.
          </p>
        </div>

        {/* Contact Form */}
        <div style={{ flex: "1 1 300px", minWidth: 300 }}>
          <h2>Send us a Message</h2>

          {submitted && (
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 5,
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 5,
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 5,
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "#ed4c67",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: 40 }}>
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>How do I track my order?</li>
          <li>Can I cancel my order after placing it?</li>
          <li>What payment methods are accepted?</li>
          <li>Do you deliver outside the city?</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerService;
