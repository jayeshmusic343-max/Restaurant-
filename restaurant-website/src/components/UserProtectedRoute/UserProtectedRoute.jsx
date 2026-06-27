import { Navigate, useLocation } from "react-router-dom";

function UserProtectedRoute({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // अगर नॉर्मल यूजर लॉग इन नहीं है, तो उसे सीधे सुंदर /auth पेज पर भेजो
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

export default UserProtectedRoute;
