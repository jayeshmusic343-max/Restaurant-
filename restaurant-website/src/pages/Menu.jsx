import { useEffect, useState } from "react";
import API from "../api/api";
import FoodCard from "../components/FoodCard/FoodCard";

function Menu({ addToCart, searchTerm }) {

  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");

  // FETCH FROM BACKEND
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        // support both shapes: array or { products: [...] }
        const data = res.data;
        if (Array.isArray(data)) setFoods(data);
        else if (data && Array.isArray(data.products)) setFoods(data.products);
        else setFoods([]);
      })
      .catch((err) => console.log(err));
  }, []);

  // FILTER LOGIC
  const filteredFoods = foods.filter((food) => {

    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  // BUTTON STYLE
  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    background: "orange",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <section style={{ padding: "50px" }}>

      <h1 style={{
        textAlign: "center",
        fontSize: "50px",
        color: "orange",
        marginBottom: "40px"
      }}>
        Our Menu
      </h1>

      {/* CATEGORY BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "40px"
      }}>

        {["All", "Fast Food", "Italian", "Indian", "Chinese", "Snacks"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={buttonStyle}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* FOOD CARDS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap"
      }}>

        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            addToCart={addToCart}
          />
        ))}

      </div>

    </section>
  );
}

export default Menu;