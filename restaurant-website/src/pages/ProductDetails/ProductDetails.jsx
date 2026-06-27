import "./ProductDetails.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails({ darkMode, addToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const defaultProduct = {
    id: 1,
    name: "Cheese Pizza",
    price: 299,
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    desc: "Fresh and delicious cheese pizza prepared with premium quality ingredients and loaded with extra cheese for better taste.",
  };

  const product = location.state?.product || defaultProduct;

  // --- बदलाव: ऐड टू कार्ट पर लॉगिन चेक ---
  const handleAddToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth");
      return;
    }

    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);
  };

  // --- बदलाव: बाय नाऊ पर लॉगिन चेक ---
  const handleBuyNow = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth");
      return;
    }

    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);

    navigate("/checkout");
  };

  return (
    <div className={`product-details ${darkMode ? "dark" : "light"}`}>
      {/* LEFT - PRODUCT IMAGE */}
      <div className="details-left">
        <img src={product.image} alt={product.name} />
      </div>

      {/* RIGHT - PRODUCT INFO */}
      <div className="details-right">
        <h1>{product.name}</h1>

        {/* RATING */}
        <div className="details-rating">⭐ {product.rating}</div>

        {/* PRICE */}
        <h2>₹{product.price}</h2>

        {/* DESCRIPTION */}
        <p>
          {product.desc ||
            `Fresh and delicious ${product.name.toLowerCase()} prepared with high quality ingredients.`}
        </p>

        {/* QUANTITY CONTROLLER */}
        <div className="quantity-box">
          <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        {/* BUTTONS */}
        <div className="details-buttons">
          <button className="cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </button>

          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
