import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

function Checkout({ cart, setCart }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const parseNumber = (value) => {
    if (value === null || value === undefined || value === "") return 0;
    const stringValue = String(value);
    return Number(stringValue.replace(/[^\d.]/g, "").trim()) || 0;
  };

  const getPrice = (price) => parseNumber(price);
  const getQuantity = (quantity) => parseNumber(quantity);

  const totalPrice = cart.reduce((total, item) => {
    return total + getPrice(item.price) * getQuantity(item.quantity);
  }, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      toast.error("Please login before placing an order.");
      navigate("/auth");
      return;
    }

    if (!fullName || !phone || !city || !address) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      await API.post("/orders/place", {
        user_id: user.id,
        cart,
        total_price: totalPrice,
      });

      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));

      toast.success("Order placed successfully 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    }
  };

  return (
    <section className="checkout">
      <div className="checkout-left">
        <h2>Delivery Address</h2>

        <form>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </form>

        <div className="payment">
          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              name="payment"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI Payment"
              checked={paymentMethod === "UPI Payment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI Payment
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
              checked={paymentMethod === "Credit/Debit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
        </div>
      </div>

      <div className="checkout-right">
        <h2>Order Summary</h2>

        {cart.map((item, index) => (
          <div className="summary-item" key={item.id || index}>
            <div>
              <h4>{item.name}</h4>
              <p>
                {getQuantity(item.quantity)} x ₹{getPrice(item.price)}
              </p>
            </div>

            <h4>
              ₹{getPrice(item.price) * getQuantity(item.quantity)}
            </h4>
          </div>
        ))}

        <div className="total">
          <h3>Total</h3>
          <h3>₹{totalPrice}</h3>
        </div>

        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </section>
  );
}

export default Checkout;