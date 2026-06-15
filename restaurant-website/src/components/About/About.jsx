import "./About.css";

function About() {
  return (
    <section className="about">

      <div className="about-image">

        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="restaurant"
        />

      </div>

      <div className="about-content">

        <h2>About Our Restaurant</h2>

        <p>
          Welcome to FoodieHub Restaurant. We provide fresh and delicious food
          made with quality ingredients and love.
        </p>

        <p>
          Our chefs prepare every dish carefully to give customers the best
          dining experience possible.
        </p>

        <button>
          Read More
        </button>

      </div>

    </section>
  );
}

export default About;