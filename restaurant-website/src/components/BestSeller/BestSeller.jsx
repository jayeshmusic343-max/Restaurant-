import "./BestSeller.css";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import ProductModal from "../ProductModal/ProductModal";
import SkeletonCard from "../Skeleton/SkeletonCard";

function BestSeller({
  wishlist,
  toggleWishlist,
  addToCart
}) {

  // Modal State
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // Loading State
  const [loading, setLoading] =
    useState(true);

  // Fake Loading Effect
  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  const products = [

    {
      id: 1,
      name: "Cheese Pizza",
      price: 299,
      rating: "4.5",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Burger Combo",
      price: 249,
      rating: "4.3",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
    },

    {
      id: 3,
      name: "Cold Drink",
      price: 99,
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop",
    },

  ];

  return (
    <>

      <section className="best-seller">

        <div className="section-title">

          <h2>Best Sellers</h2>

          <button>
            View All
          </button>

        </div>

        <div className="product-container">

          {loading ? (

            [...Array(4)].map((_, index) => (

              <SkeletonCard key={index} />

            ))

          ) : (

            products.map((item) => (

              <Link
                to="/product-details"
                className="product-link"
                key={item.id}
              >

                <div
                  className="product-card"
                  onClick={() =>
                    setSelectedProduct(item)
                  }
                >

                  {/* Wishlist Button */}

                  <button
                    className="wishlist-btn"

                    onClick={(e) => {

                      e.preventDefault();

                      e.stopPropagation();

                      toggleWishlist(item);

                    }}
                  >

                    {wishlist.find(
                      (product) =>
                        product.id === item.id
                    )
                      ? "❤️"
                      : "🤍"}

                  </button>

                  {/* PRODUCT CARD */}

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="product-info">

                    <h2>{item.name}</h2>

                    <div className="rating">
                      ⭐ {item.rating}
                    </div>

                    <p>
                      Fresh and delicious food
                      prepared with high quality
                      ingredients.
                    </p>

                    <div className="product-bottom">

                      <span className="price">
                        ₹{item.price}
                      </span>

                      <button
                        className="add-btn"

                        onClick={(e) => {

                          e.preventDefault();

                          e.stopPropagation();

                          addToCart(item);

                        }}
                      >
                        Add To Cart
                      </button>

                    </div>

                  </div>

                </div>

              </Link>

            ))

          )}

        </div>

      </section>

      {/* Product Modal */}

      <ProductModal
        product={selectedProduct}

        closeModal={() =>
          setSelectedProduct(null)
        }
      />

    </>
  );
}

export default BestSeller;