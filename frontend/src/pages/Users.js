import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/api";
import { useAuth } from "../auth/AuthContext";

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const tenantId = user?.tenant?.id;

  useEffect(() => {
    if (!tenantId) return;

    getUsers(tenantId).then((res) => {
      setUsers(res.data.data.users);
    });
  }, [tenantId]);

  const handleAddUser = async (e) => {
    e.preventDefault();

    await createUser(tenantId, {
      email,
      fullName: name,
      password: "User@123"
    });

    const res = await getUsers(tenantId);
    setUsers(res.data.data.users);

    setEmail("");
    setName("");
  };

  const handleDelete = async (id) => {
    await deleteUser(id);

    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h2>Users</h2>

      {/* ADD USER */}
      <form onSubmit={handleAddUser}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Add User</button>
      </form>

      {/* LIST USERS */}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.fullName} ({u.email}) — {u.role}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
