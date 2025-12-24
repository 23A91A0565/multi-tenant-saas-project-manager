import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/projects">Projects</Link>

      {user.role === "tenant_admin" && (
        <>
          {" | "}
          <Link to="/users">Users</Link>
        </>
      )}

      <span style={{ marginLeft: "20px" }}>
        {user.email} ({user.role})
      </span>

      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
