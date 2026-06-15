import "./Wishlist.css";

function Wishlist({
  wishlist,
  toggleWishlist,
  addToCart
}) {

  return (
    <section className="wishlist-page">

      <h1>
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (

        <h2 className="empty">
          No Favorite Products
        </h2>

      ) : (

        <div className="wishlist-container">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={item.id}
            >

              <button
                className="remove-btn"

                onClick={() =>
                  toggleWishlist(item)
                }
              >
                ❌
              </button>

              <img
                src={item.image}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              <p>{item.price}</p>

              <button
                className="add-btn"

                onClick={() => addToCart(item)}
              >
                Add To Cart
              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Wishlist;