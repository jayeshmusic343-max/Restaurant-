import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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

// 🔐 दोनों प्रोटेक्टेड रूट्स (एडमिन और नॉर्मल यूजर के लिए अलग-अलग)
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute/UserProtectedRoute";

import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

// 1. SCROLL TO TOP COMPONENT
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // currentUser को स्टेट में रखा ताकि री-रेंडर सही से ट्रिगर हो
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // लॉगिन/लॉगआउट होने पर स्टेट को तुरंत सिंक करने के लिए इवेंट लिसनर्स
  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", checkUser);
    window.addEventListener("focus", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("focus", checkUser);
    };
  }, []);

  // डायनामिक Keys जो currentUser स्टेट पर निर्भर करती हैं
  const cartKey = currentUser ? `cart_${currentUser.id}` : "cart_guest";
  const wishlistKey = currentUser
    ? `wishlist_${currentUser.id}`
    : "wishlist_guest";

  // कार्ट और विशलिस्ट की इनिशियल स्टेट्स
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem(wishlistKey);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // जब भी cartKey या wishlistKey बदले, नया डेटा लोड हो
  useEffect(() => {
    const savedCart = localStorage.getItem(cartKey);
    setCart(savedCart ? JSON.parse(savedCart) : []);

    const savedWishlist = localStorage.getItem(wishlistKey);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, [cartKey, wishlistKey]);

  // जब कार्ट या विशलिस्ट की स्टेट्स बदलें, तो उन्हें लोकलस्टोरेज में सेव करना
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  useEffect(() => {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, wishlistKey]);

  // सारे फ़ंक्शंस को ऊपर ही रखा है ताकि Hoisting या 'Not Defined' एरर न आए
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Item Removed");
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    exists
      ? setWishlist(wishlist.filter((item) => item.id !== product.id))
      : setWishlist([...wishlist, product]);
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleWishlist={toggleWishlist}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
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
  selectedCategory,
  setSelectedCategory,
  darkMode,
  setDarkMode,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // यह कंडीशन /admin-login और बाकी सारे एडमिन पेजों को सही से पकड़ेगी
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login";

  // सुरक्षा गार्ड: अगर कोई नॉर्मल यूजर गलती से भी /admin-login पर जाएगा तो सीधे /auth पेज पर चला जाएगा
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && location.pathname === "/admin-login") {
      navigate("/auth");
    }
  }, [location.pathname, navigate]);

  // वैश्विक addToCart फ़ंक्शन
  const addToCart = (food) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first.");
      navigate("/auth");
      return;
    }

    const existingItem = cart.find((item) => item.id === food.id);
    const qtyToAdd = food.quantity ? food.quantity : 1;

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...food, quantity: qtyToAdd }]);
    }

    toast.success(
      <div>
        ✅ Item Added To Cart
        <Link
          to="/cart"
          style={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "underline",
            display: "block",
            marginTop: "5px",
          }}
        >
          🛒 Go To Cart
        </Link>
      </div>,
    );
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <ScrollToTop />

      {/* अगर एडमिन पेज है तो नॉर्मल यूजर का नेवबार पूरी तरह गायब रहेगा */}
      {!isAdminPage && (
        <Navbar
          cartCount={cart.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              searchQuery={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/menu"
          element={
            <Menu
              addToCart={addToCart}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />
          }
        />

        {/* 🔐 नॉर्मल यूजर के रूट्स - जो अब सिर्फ UserProtectedRoute का उपयोग करेंगे */}
        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                darkMode={darkMode}
              />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout cart={cart} setCart={setCart} darkMode={darkMode} />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <UserProtectedRoute>
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                darkMode={darkMode}
              />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <UserProtectedRoute>
              <Orders darkMode={darkMode} />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-details"
          element={<ProductDetails darkMode={darkMode} addToCart={addToCart} />}
        />

        {/* 🛠️ एडमिन के रूट्स - जो केवल एडमिन टोकन वाला ProtectedRoute उपयोग करेंगे */}
        <Route path="/admin-login" element={<AdminLogin />} />
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
      </Routes>

      {/* एडमिन पेज होने पर फुटर और मोबाइल नेवबार लोड नहीं होंगे */}
      {!isAdminPage && <Contact />}
      {!isAdminPage && (
        <MobileNav cartCount={cart.length} darkMode={darkMode} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
