import "./Navbar.css";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

function Navbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode
}) {

  const [showLocation, setShowLocation] =
    useState(false);

  const [city, setCity] =
    useState("Bhopal, Madhya Pradesh");

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);

  // SELECT CITY

  const selectCity = (newCity) => {

    setCity(newCity);

    setShowLocation(false);

  };

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.reload();

  };

  return (

    <nav className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <Link
          to="/"
          className="logo"
        >
          FoodieHub
        </Link>

        <div className="location-wrapper">

          <div
            className="location"

            onClick={() =>
              setShowLocation(!showLocation)
            }
          >

            <div className="location-text">

              <h3>
                Delivery in 15 min
              </h3>

              <p>{city}</p>

            </div>

            <span className="dropdown-icon">

              {showLocation ? "▲" : "▼"}

            </span>

          </div>

          {showLocation && (

            <div className="location-dropdown">

              <p
                onClick={() =>
                  selectCity(
                    "Bhopal, Madhya Pradesh"
                  )
                }
              >
                Bhopal
              </p>

              <p
                onClick={() =>
                  selectCity(
                    "Delhi, India"
                  )
                }
              >
                Delhi
              </p>

              <p
                onClick={() =>
                  selectCity(
                    "Mumbai, Maharashtra"
                  )
                }
              >
                Mumbai
              </p>

              <p
                onClick={() =>
                  selectCity(
                    "Bangalore, Karnataka"
                  )
                }
              >
                Bangalore
              </p>

              <p
                onClick={() =>
                  selectCity(
                    "Indore, Madhya Pradesh"
                  )
                }
              >
                Indore
              </p>

            </div>

          )}

        </div>

      </div>

      {/* SEARCH */}

      <div className="nav-search">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search Pizza, Burger..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        {user ? (

          <>
            <span className="nav-name">
              👤 {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          <Link
            to="/auth"
            className="nav-btn"
          >
            Login
          </Link>

        )}

        <Link
          to="/wishlist"
          className="nav-btn"
        >
          Wishlist
        </Link>

        <Link to="/orders" className="nav-btn">Orders</Link>

        <Link
          to="/cart"
          className="cart-btn"
        >
          Cart ({cartCount})
        </Link>

        <button
          className="theme-btn"

          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode ? "☀️" : "🌙"}

        </button>

      </div>

    </nav>

  );

}

export default Navbar;