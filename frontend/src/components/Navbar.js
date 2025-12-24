import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/projects">Projects</Link>{" | "}

      {user.role === "tenant_admin" && (
        <Link to="/users">Users</Link>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
