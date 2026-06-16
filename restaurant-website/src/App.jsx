import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import MobileNav from "./components/MobileNav/MobileNav";
import Contact from "./components/Contact/Contact";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";

import ProductDetails from "./pages/ProductDetails/ProductDetails";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Orders from "./pages/Orders";

function App() {
  /* =========================
      STATES
  ========================= */

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  /* =========================
      LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  /* =========================
      CART FUNCTIONS
  ========================= */

  const addToCart = (food) => {
    const existingItem = cart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === food.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }

    toast.success("Item Added To Cart");
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    toast.error("Item Removed");
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    setCart(updatedCart);
  };

  /* =========================
      WISHLIST
  ========================= */

  const toggleWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      const updatedWishlist =
        wishlist.filter(
          (item) =>
            item.id !== product.id
        );

      setWishlist(updatedWishlist);
    } else {
      setWishlist([
        ...wishlist,
        product,
      ]);
    }
  };

  return (
    <BrowserRouter>
      <AppContent 
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        toggleWishlist={toggleWishlist}
      />
    </BrowserRouter>
  );
}

function AppContent({
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
}) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className={darkMode ? "dark" : "light"}>

      {/* NAVBAR - Only on non-admin pages */}
      {!isAdminPage && (
        <Navbar
          cartCount={cart.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* ROUTES */}
      <Routes>

        {/* HOME - (यहाँ हमने darkMode और अन्य ज़रूरी props पास कर दिए हैं) */}
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              searchQuery={searchTerm} 
              darkMode={darkMode}
            />
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={<ServicesPage />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<ContactPage />}
        />

        {/* AUTH */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* MENU */}
        <Route
          path="/menu"
          element={
            <Menu
              addToCart={addToCart}
              searchTerm={searchTerm}
              darkMode={darkMode}
            />
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              darkMode={darkMode}
            />
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Checkout cart={cart} setCart={setCart} darkMode={darkMode} />
          }
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              darkMode={darkMode}
            />
          }
        />

        {/* PRODUCT DETAILS - (यहाँ भी darkMode और addToCart पास कर दिया है) */}
        <Route
          path="/product-details"
          element={<ProductDetails darkMode={darkMode} addToCart={addToCart} />}
        />

        {/* ADMIN */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* ORDERS PAGE */}
        <Route path="/orders" element={<Orders darkMode={darkMode} />} />

      </Routes>

      {/* FOOTER - Only on non-admin pages */}
      {!isAdminPage && <Contact />}

      {/* MOBILE NAV - Only on non-admin pages */}
      {!isAdminPage && (
        <MobileNav
          cartCount={cart.length}
          darkMode={darkMode}
        />
      )}

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}

export default App;