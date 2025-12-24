import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then(res => setStats(res.data.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <p>Total Tasks: {stats.totalTasks}</p>
        <p>Completed Tasks: {stats.completedTasks}</p>
        <p>Pending Tasks: {stats.pendingTasks}</p>
        <p>My Tasks: {stats.myTasks}</p>
      </div>
    </div>
  );
}

export default Dashboard;
