import "./BestSeller.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductModal from "../ProductModal/ProductModal";
import SkeletonCard from "../Skeleton/SkeletonCard";

function BestSeller({
  wishlist = [],
  toggleWishlist,
  addToCart,
  searchQuery = ""
}) {
  const navigate = useNavigate();

  const goToProductDetails = (item) => {
    navigate("/product-details", {
      state: { product: item },
    });
  };

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Fake Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // फूड आइटम्स की लिस्ट
  const products = [
    {
      id: 1,
      name: "Cheese Pizza",
      price: 299,
      rating: "4.5",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Burger Combo",
      price: 249,
      rating: "4.3",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Cold Drink",
      price: 99,
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop",
    },
  ];

  // सर्च क्वेरी के हिसाब से प्रोडक्ट्स को फ़िल्टर करने का लॉजिक
  const filteredProducts = products.filter((item) => {
    if (!searchQuery) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <section className="best-seller">
        <div className="section-title">
          <h2>Best Sellers</h2>
          <button>View All</button>
        </div>

        <div className="product-container">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              // चेक करें कि आइटम विशलिस्ट में है या नहीं
              const isWishlisted = wishlist.some((product) => product.id === item.id);

              return (
                <div
                  className="product-card"
                  key={item.id}
                  onClick={() => goToProductDetails(item)}
                >
                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    style={{ color: isWishlisted ? "red" : "#6b7280", zIndex: 10 }}
                  >
                    {isWishlisted ? "❤️" : "🤍"}
                  </button>

                  <img src={item.image} alt={item.name} />

                  <div className="product-info">
                    <h2>{item.name}</h2>
                    <div className="rating">⭐ {item.rating}</div>
                    <p>
                      Fresh and delicious food prepared with high quality
                      ingredients.
                    </p>
                  </div>

                  <div className="product-info" style={{ paddingTop: 0 }}>
                    <div className="product-bottom">
                      <span className="price">₹{item.price}</span>
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
              );
            })
          ) : (
            <div style={{ textAlign: "center", width: "100%", padding: "40px", fontSize: "18px", color: "#888" }}>
              😞 No foods found matching "{searchQuery}"
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        closeModal={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default BestSeller;