import "./ProductDetails.css";

import { useState } from "react";

function ProductDetails() {

  const [quantity, setQuantity] =
    useState(1);

  return (

    <div className="product-details">

      {/* LEFT */}

      <div className="details-left">

        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
          alt=""
        />

      </div>

      {/* RIGHT */}

      <div className="details-right">

        <h1>Cheese Pizza</h1>

        {/* RATING */}

        <div className="details-rating">

          ⭐ 4.5

        </div>

        {/* PRICE */}

        <h2>₹299</h2>

        {/* DESCRIPTION */}

        <p>
          Fresh and delicious cheese pizza
          prepared with premium quality
          ingredients and loaded with extra
          cheese for better taste.
        </p>

        {/* QUANTITY */}

        <div className="quantity-box">

          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        {/* BUTTONS */}

        <div className="details-buttons">

          <button className="cart-btn">
            Add To Cart
          </button>

          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;