import { Link } from "react-router-dom";

// 👈 यहाँ { darkMode } प्रोप रिसीव करना ज़रूरी है
function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  darkMode 
}) {

  const totalPrice = cart.reduce((total, item) => {
    const price = Number(String(item.price).replace("₹", ""));
    return total + price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        padding: "50px",
        minHeight: "100vh",
        // 👈 डार्क मोड का बैकग्राउंड कलर
        backgroundColor: darkMode ? "#0f0f0f" : "white",
        color: darkMode ? "white" : "black",
        transition: "0.3s"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "orange",
          marginBottom: "40px",
          fontSize: "50px"
        }}
      >
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                // 👈 कार्ड का कलर भी डार्क मोड के हिसाब से चेंज होगा
                background: darkMode ? "#1e1e1e" : "#f5f5f5",
                padding: "clamp(14px, 3vw, 20px)",
                marginBottom: "clamp(14px, 3vw, 20px)",
                borderRadius: 10,
                transition: "0.3s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 20px)", minWidth: 260 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "clamp(90px, 20vw, 120px)",
                    height: "clamp(90px, 20vw, 120px)",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ fontSize: "clamp(18px, 4.2vw, 24px)" }}>{item.name}</h2>
                  <p style={{ color: "orange", fontWeight: "bold", fontSize: "clamp(16px, 4vw, 20px)" }}>{item.price}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{ padding: "8px 14px", border: "none", background: "orange", color: "white", cursor: "pointer", borderRadius: "5px" }}
                  >-</button>
                  <h3 style={{ fontSize: "clamp(16px, 4vw, 18px)" }}>{item.quantity}</h3>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{ padding: "8px 14px", border: "none", background: "orange", color: "white", cursor: "pointer", borderRadius: "5px" }}
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: "clamp(10px, 2.5vw, 12px) clamp(14px, 4vw, 20px)", border: "none", background: "red", color: "white", borderRadius: "5px", cursor: "pointer", width: "fit-content" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ textAlign: "right", marginTop: "30px", color: "orange", fontSize: "clamp(18px, 4.6vw, 28px)" }}>
            Total: ₹{totalPrice}
          </h2>

          <Link to="/checkout" style={{ display: "block", marginTop: "20px", textAlign: "right" }}>
            <button
              style={{
                padding: "clamp(12px, 3.5vw, 15px) clamp(18px, 6vw, 25px)",
                border: "none",
                background: "#0f8a2d",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                float: "none",
                width: "fit-content"
              }}
            >
              Proceed To Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;