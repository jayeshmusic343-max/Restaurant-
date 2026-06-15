import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* LEFT */}

      <div className="hero-left">

        <h1>
          Fresh Food Delivered In 15 Minutes
        </h1>

        <p>
          Get groceries, snacks, beverages and meals
          delivered instantly at your doorstep.
        </p>

        <button>
          Shop Now
        </button>

      </div>

      {/* RIGHT */}

      <div className="hero-right">

        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="food"
        />

      </div>

    </section>
  );
}

export default Hero; 