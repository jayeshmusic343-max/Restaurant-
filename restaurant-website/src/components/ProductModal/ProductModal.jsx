import "./ProductModal.css";

function ProductModal({ product, closeModal }) {

  if(!product){
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        {/* CLOSE BUTTON */}

        <button
          className="close-btn"
          onClick={closeModal}
        >
          X
        </button>

        {/* IMAGE */}

        <img
          src={product.image}
          alt={product.name}
        />

        {/* CONTENT */}

        <div className="modal-content">

          <h2>{product.name}</h2>

          <p className="rating">
            ⭐ {product.rating}
          </p>

          <p className="description">
            Fresh and delicious food prepared with
            high quality ingredients.
          </p>

          <h3>{product.price}</h3>

          <button className="add-btn">
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;