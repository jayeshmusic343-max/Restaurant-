import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import BestSeller from "../components/BestSeller/BestSeller";
import Promo from "../components/Promo/Promo";

// App.jsx से आ रही searchQuery को यहाँ रिसीव किया
function Home({ wishlist, toggleWishlist, addToCart, searchQuery }) {
  return (
    <div>
      <Hero />

      <Categories />

      <BestSeller
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        searchQuery={searchQuery} // यहाँ से बेस्ट सेलर में चली गई
      />

      <Promo />
    </div>
  );
}

export default Home;