import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../../api/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        await API.get("/admin/dashboard");
        setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading) return null;

  if (!authorized) {
    return (
      <Navigate to="/admin-login" state={{ from: location }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;
