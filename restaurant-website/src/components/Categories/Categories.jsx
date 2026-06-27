import "./Categories.css";

function Categories() {
  const categoryData = [
    {
      id: 1,
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
    {
      id: 2,
      name: "Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
      id: 3,
      name: "Drinks",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e",
    },
    {
      id: 4,
      name: "Vegetables",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
    {
      id: 5,
      name: "Ice Cream",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    },
    {
      id: 6,
      name: "Snacks",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
    },

    {
      id: 32,
      name: "Dal Makhani",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&sig=32",
    },
    {
      id: 33,
      name: "Veg Manchurian",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&sig=42",
    },
    {
      id: 34,
      name: "Butter Naan",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&sig=34",
    },

    {
      id: 41,
      name: "Gulab Jamun",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&sig=41",
    },
  ];

  const handleCategoryClick = () => {
    const section = document.getElementById("best-seller-section");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section>
      <h2>Shop By Category</h2>
      <div className="category-container">
        {categoryData.map((item) => (
          <div
            className="category-card"
            key={item.id}
            onClick={handleCategoryClick}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
