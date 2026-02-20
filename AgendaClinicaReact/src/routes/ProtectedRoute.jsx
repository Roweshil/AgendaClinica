import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};