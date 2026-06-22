



// import { useEffect, useState, useMemo } from "react";
// import API from "../api/api";
// import FoodCard from "../components/FoodCard/FoodCard";

// function Menu({ addToCart, searchTerm }) {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state add kiya

//   // FETCH FROM BACKEND
//   useEffect(() => {
//     setLoading(true);
//     API.get("/products")
//       .then((res) => {
//         const data = res.data;
//         if (Array.isArray(data)) setFoods(data);
//         else if (data && Array.isArray(data.products)) setFoods(data.products);
//         else setFoods([]);
//         setLoading(false); // Data milne par loading band
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   // FILTER LOGIC (useMemo ka use kiya taaki bar-bar recalculate na ho)
//   const filteredFoods = useMemo(() => {
//     return foods.filter((food) =>
//       food.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [foods, searchTerm]);

//   return (
//     <section style={{ padding: "50px" }}>
//       <h1 style={{
//         textAlign: "center",
//         fontSize: "50px",
//         color: "orange",
//         marginBottom: "40px"
//       }}>
//         Our Menu
//       </h1>

//       {/* LOADING STATE */}
//       {loading ? (
//         <div style={{ textAlign: "center", fontSize: "20px" }}>Loading Menu...</div>
//       ) : (
//         /* FOOD CARDS */
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "30px",
//           flexWrap: "wrap"
//         }}>
//           {filteredFoods.length > 0 ? (
//             filteredFoods.map((food) => (
//               <FoodCard
//                 key={food.id}
//                 food={food}
//                 addToCart={addToCart}
//               />
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Menu;


// import { useEffect, useState, useMemo } from "react";
// import API from "../api/api";
// import FoodCard from "../components/FoodCard/FoodCard";

// function Menu({ addToCart, searchTerm }) {
//   const [foods, setFoods] = useState([]);
//   const [category, setCategory] = useState("All"); // Category state wapas aa gayi
//   const [loading, setLoading] = useState(true);

//   // FETCH FROM BACKEND
//   useEffect(() => {
//     setLoading(true);
//     API.get("/products")
//       .then((res) => {
//         const data = res.data;
//         const productsArray = Array.isArray(data) ? data : (data.products || []);
//         setFoods(productsArray);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   // FILTER LOGIC: Search aur Category dono ka perfect combination
//   const filteredFoods = useMemo(() => {
//     return foods.filter((food) => {
//       const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Agar user kuch search kar raha hai toh 'All' category ki tarah kaam karega
//       const isSearching = searchTerm.length > 0;
//       const matchesCategory = isSearching || category === "All" || 
//         (food.category && food.category.toLowerCase() === category.toLowerCase());
      
//       return matchesSearch && matchesCategory;
//     });
//   }, [foods, searchTerm, category]);

//   return (
//     <section style={{ padding: "50px" }}>
//       <h1 style={{ textAlign: "center", fontSize: "50px", color: "orange", marginBottom: "40px" }}>
//         Our Menu
//       </h1>

//       {/* CATEGORY BUTTONS */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
//         {["All", "Fast Food", "Italian", "Indian", "Chinese", "Snacks", "Drinks", "Dessert"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             style={{
//               padding: "10px 20px",
//               border: "none",
//               background: category === cat ? "#ff9900" : "#eee",
//               color: category === cat ? "white" : "black",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontWeight: "600"
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* LOADING STATE */}
//       {loading ? (
//         <div style={{ textAlign: "center", fontSize: "20px" }}>Loading Menu...</div>
//       ) : (
//         /* FOOD CARDS */
//         <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
//           {filteredFoods.length > 0 ? (
//             filteredFoods.map((food) => (
//               <FoodCard
//                 key={food.id}
//                 food={food}
//                 addToCart={addToCart}
//               />
//             ))
//           ) : (
//             <p style={{ fontSize: "18px", color: "#666" }}>No products found.</p>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Menu;


import { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import FoodCard from "../components/FoodCard/FoodCard";

function Menu({ addToCart, searchTerm }) {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  // Local state for search to handle the 'X' button functionality
  const [localSearch, setLocalSearch] = useState(searchTerm || "");

  // Update localSearch when props searchTerm changes
  useEffect(() => {
    setLocalSearch(searchTerm || "");
  }, [searchTerm]);

  // FETCH FROM BACKEND
  useEffect(() => {
    setLoading(true);
    API.get("/products")
      .then((res) => {
        const data = res.data;
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        setFoods(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // FILTER LOGIC
  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(localSearch.toLowerCase());
      
      const isSearching = localSearch.length > 0;
      const matchesCategory = isSearching || category === "All" || 
        (food.category && food.category.toLowerCase() === category.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [foods, localSearch, category]);

  return (
    <section style={{ padding: "50px" }}>
      <h1 style={{ textAlign: "center", fontSize: "50px", color: "orange", marginBottom: "40px" }}>
        Our Menu
      </h1>

      {/* SEARCH BOX WITH X BUTTON */}
      <div style={{ position: "relative", width: "300px", margin: "0 auto 30px" }}>
        <input
          type="text"
          placeholder="Search items..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 40px 10px 15px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "#ff9900",
              fontWeight: "bold"
            }}
          >
            &times;
          </button>
        )}
      </div>

      {/* CATEGORY BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
        {["All", "Fast Food", "Italian", "Indian", "Chinese", "Snacks", "Drinks", "Dessert"].map((cat) => (
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
              fontWeight: "600"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING STATE & FOOD CARDS */}
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "20px" }}>Loading Menu...</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p style={{ fontSize: "18px", color: "#666" }}>No products found.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Menu;