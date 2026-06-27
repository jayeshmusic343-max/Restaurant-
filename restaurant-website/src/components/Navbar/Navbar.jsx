import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import foodData from "../../data/foodData";

function Navbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
}) {
  const [showLocation, setShowLocation] = useState(false);
  const [city, setCity] = useState("Bhopal, Madhya Pradesh");
  const [user, setUser] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions =
    searchTerm.length > 0
      ? foodData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  const selectCity = (newCity) => {
    setCity(newCity);
    setShowLocation(false);
  };

  // --- बदलाव: अब यह लॉगआउट पर टोकन और यूज़र के साथ गेस्ट डेटा भी साफ़ करेगा और होमपेज पर रीडायरेक्ट करेगा ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart_guest");
    localStorage.removeItem("wishlist_guest");

    window.location.href = "/";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);
    navigate("/menu");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">
          FoodieHub
        </Link>
        <div className="location-wrapper">
          <div
            className="location"
            onClick={() => setShowLocation(!showLocation)}
          >
            <div className="location-text">
              <h3>Delivery in 15 min</h3>
              <p>{city}</p>
            </div>
            <span className="dropdown-icon">{showLocation ? "▲" : "▼"}</span>
          </div>

          {showLocation && (
            <div className="location-dropdown">
              <p onClick={() => selectCity("Bhopal, Madhya Pradesh")}>Bhopal</p>
              <p onClick={() => selectCity("Delhi, India")}>Delhi</p>
              <p onClick={() => selectCity("Mumbai, Maharashtra")}>Mumbai</p>
              <p onClick={() => selectCity("Bangalore, Karnataka")}>
                Bangalore
              </p>
              <p onClick={() => selectCity("Indore, Madhya Pradesh")}>Indore</p>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH WITH X BUTTON */}
      <div className="nav-search" ref={searchRef}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search Pizza, Burger..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          style={{ paddingRight: "40px" }} // X button ke liye space
        />

        {/* X BUTTON */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            style={{
              position: "absolute",
              right: "45px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "#666",
              fontWeight: "bold",
            }}
          >
            &times;
          </button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item)}
              >
                🔍 {item.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/profile" className="user-name">
              👤 {user.name}
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="nav-btn">
            Login
          </Link>
        )}
        <Link to="/wishlist" className="nav-btn">
          Wishlist
        </Link>
        <Link to="/orders" className="nav-btn">
          Orders
        </Link>
        <Link to="/cart" className="cart-btn">
          Cart ({cartCount})
        </Link>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
