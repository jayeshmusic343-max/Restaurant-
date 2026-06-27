// import "./Profile.css";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     navigate("/auth");
//     return null;
//   }

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/auth");
//     window.location.reload();
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile">
//         <div className="profile-header">
//           <div className="profile-avatar">
//             <FaUserCircle />
//           </div>

//           <h2>{user.name}</h2>
//           <p>Welcome to FoodieHub 👋</p>
//         </div>

//         <div className="profile-body">
//           <div className="profile-info">
//             <h4>Name</h4>
//             <p>{user.name}</p>
//           </div>

//           <div className="profile-info">
//             <h4>Email</h4>
//             <p>{user.email}</p>
//           </div>

//           <div className="profile-buttons">
//             <button onClick={() => navigate("/orders")}>📦 My Orders</button>

//             <button onClick={() => navigate("/wishlist")}>❤️ Wishlist</button>

//             <button className="logout-btn" onClick={logout}>
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 👈 स्टेप 1: darkMode प्रॉप को यहाँ रिसीव कर लिया
function Profile({ darkMode }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/auth");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
    window.location.reload();
  };

  return (
    // 👈 स्टेप 2: डाइनेमिक क्लास जोड़ दी ताकि डार्क मोड बैकग्राउंड और टेक्स्ट पर काम करे
    <div className={`profile-page ${darkMode ? "dark" : "light"}`}>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUserCircle />
          </div>

          <h2>{user.name}</h2>
          <p>Welcome to FoodieHub 👋</p>
        </div>

        <div className="profile-body">
          <div className="profile-info">
            <h4>Name</h4>
            <p>{user.name}</p>
          </div>

          <div className="profile-info">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>

          <div className="profile-buttons">
            <button onClick={() => navigate("/orders")}>📦 My Orders</button>

            <button onClick={() => navigate("/wishlist")}>❤️ Wishlist</button>

            <button className="logout-btn" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
