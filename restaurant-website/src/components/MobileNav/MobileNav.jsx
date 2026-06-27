import "./MobileNav.css";

import { FaHome, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

function MobileNav({ cartCount }) {
  return (
    <div className="mobile-nav">
      <Link to="/">
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/menu">
        <FaSearch />
        <span>Search</span>
      </Link>

      <Link to="/cart">
        <FaShoppingCart />
        <span>Cart ({cartCount})</span>
      </Link>

      <Link to="/profile">
        <FaUser />
        <span>Profile</span>
      </Link>
    </div>
  );
}

export default MobileNav;
