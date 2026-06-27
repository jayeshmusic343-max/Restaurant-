import { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import FoodCard from "../components/FoodCard/FoodCard";

function Menu({ addToCart, searchTerm }) {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH FROM BACKEND
  useEffect(() => {
    setLoading(true);
    API.get("/products")
      .then((res) => {
        const data = res.data;
        const productsArray = Array.isArray(data) ? data : data.products || [];
        setFoods(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // FILTER LOGIC (अब सीधे Navbar से आने वाले searchTerm का इस्तेमाल कर रहा है)
  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase());

      const isSearching = (searchTerm || "").length > 0;
      const matchesCategory =
        isSearching ||
        category === "All" ||
        (food.category &&
          food.category.toLowerCase() === category.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [foods, searchTerm, category]);

  return (
    <section style={{ padding: "50px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          color: "orange",
          marginBottom: "40px",
        }}
      >
        Our Menu
      </h1>

      {/* 🚫 एक्स्ट्रा लोकल सर्च बॉक्स यहाँ से पूरी तरह हटा दिया गया है */}

      {/* CATEGORY BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {[
          "All",
          "Fast Food",
          "Italian",
          "Indian",
          "Chinese",
          "Snacks",
          "Drinks",
          "Dessert",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: category === cat ? "#ff9900" : "#eee",
              color: category === cat ? "white" : "black",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING STATE & FOOD CARDS */}
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          Loading Menu...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} addToCart={addToCart} />
            ))
          ) : (
            <p style={{ fontSize: "18px", color: "#666" }}>
              No products found.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default Menu;
