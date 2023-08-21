import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, children }) => {
  return (
    <>
      {
        isLogged
          ? children
          : <Navigate to="/" />
      }
    </>
  )
};

export default ProtectedRoute;
