import "./BestSeller.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import foodData from "../../data/foodData"; // Import added
import ProductModal from "../ProductModal/ProductModal";
import SkeletonCard from "../Skeleton/SkeletonCard";

function BestSeller({
  wishlist = [],
  toggleWishlist,
  addToCart,
  searchQuery = "",
  selectedCategory = "" // New prop added
}) {
  const navigate = useNavigate();

  const goToProductDetails = (item) => {
    navigate("/product-details", {
      state: { product: item },
    });
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Updated filter logic
  const filteredProducts = foodData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section
        className="best-seller"
        id="best-seller-section"
      >
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

      <ProductModal
        product={selectedProduct}
        closeModal={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default BestSeller;