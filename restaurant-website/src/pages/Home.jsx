import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Contact from "../components/Contact/Contact";
import Categories from "../components/Categories/Categories";
import BestSeller from "../components/BestSeller/BestSeller";
import Promo from "../components/Promo/Promo";


function Home({
  wishlist,
  toggleWishlist,
  addToCart
}) {

  return (
    <div>

      <Hero />

      <Categories />

      <BestSeller
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
      />

      <Promo />

     

    

    </div>
  );
}

export default Home;