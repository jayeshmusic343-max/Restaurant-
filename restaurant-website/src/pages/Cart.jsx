import { Link } from "react-router-dom";


function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
}) {

  // Total Price
  // TOTAL PRICE

const totalPrice = cart.reduce(

  (total, item) => {

    const price = Number(
      String(item.price).replace("₹", "")
    );

    return total + price * item.quantity;

  },

  0

);

  return (
    <div
      style={{
        padding: "50px",
        minHeight: "100vh"
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

        <h2 style={{ textAlign: "center" }}>
          Cart is Empty
        </h2>

      ) : (

        <>
          {cart.map((item) => (

            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#f5f5f5",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px"
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px"
                }}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <div>
                  <h2>{item.name}</h2>
                  <p>{item.price}</p>
                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px"
                }}
              >

                {/* Quantity Buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}
                >

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      padding: "8px 15px",
                      border: "none",
                      background: "orange",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "5px"
                    }}
                  >
                    -
                  </button>

                  <h3>{item.quantity}</h3>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      padding: "8px 15px",
                      border: "none",
                      background: "orange",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "5px"
                    }}
                  >
                    +
                  </button>

                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    background: "red",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          {/* Total Price */}
          <h2
            style={{
              textAlign: "right",
              marginTop: "30px",
              color: "orange"
            }}
          >
            Total: ₹{totalPrice}
          </h2>

          {/* Checkout Button */}
          <Link to="/checkout">

            <button
              style={{
                marginTop: "20px",
                padding: "15px 25px",
                border: "none",
                background: "#0f8a2d",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                float: "right"
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


