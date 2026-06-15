import "./Services.css";

function Services() {
  return (
    <section className="services">

      <h2>Our Services</h2>

      <div className="service-container">

        <div className="service-card">

          <div className="icon">🍔</div>

          <h3>Quality Food</h3>

          <p>
            We provide fresh and high quality food for our customers.
          </p>

        </div>

        <div className="service-card">

          <div className="icon">🚚</div>

          <h3>Fast Delivery</h3>

          <p>
            Get your favorite meals delivered quickly to your doorstep.
          </p>

        </div>

        <div className="service-card">

          <div className="icon">👨‍🍳</div>

          <h3>Expert Chefs</h3>

          <p>
            Our professional chefs cook every dish with perfection.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Services;