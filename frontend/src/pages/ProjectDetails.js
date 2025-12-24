import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, getProjectTasks } from "../api/api";
import { createTask } from "../api/api";
import { updateTaskStatus } from "../api/api";
import { deleteProject } from "../api/api";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
const [title, setTitle] = useState("");

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

const [editing, setEditing] = useState(false);
const [name, setName] = useState("");

const navigate = useNavigate();

const handleDeleteProject = async () => {
  if (!window.confirm("Delete this project?")) return;

  await deleteProject(id);
  navigate("/projects");
};

const handleCreateTask = async (e) => {
  e.preventDefault();

  await createTask(id, { title });

  const tasksRes = await getProjectTasks(id);
  setTasks(tasksRes.data.data);

  setTitle("");
};

const handleStatusChange = async (taskId, status) => {
  await updateTaskStatus(taskId, status);

  const tasksRes = await getProjectTasks(id);
  setTasks(tasksRes.data.data);
};

const handleUpdateProject = async () => {
  await updateProject(id, { name });

  const res = await getProjectById(id);
  setProject(res.data.data);

  setEditing(false);
};

  useEffect(() => {
    Promise.all([
      getProjectById(id),
      getProjectTasks(id),
    ])
      .then(([projectRes, tasksRes]) => {
        setProject(projectRes.data.data);
        setTasks(tasksRes.data.data);
      })
      .catch((err) => {
        console.error("Failed to load project details", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

setName(projectRes.data.data.name);

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      <hr />

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.status}
            </li>
          ))}
        </ul>
      )}

	<form onSubmit={handleCreateTask}>
  <input
    placeholder="New task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />
  <button type="submit">Add Task</button>
</form>

<li key={task.id}>
  <strong>{task.title}</strong> — {task.status}

  <button onClick={() => handleStatusChange(task.id, "todo")}>Todo</button>
  <button onClick={() => handleStatusChange(task.id, "in_progress")}>In Progress</button>
  <button onClick={() => handleStatusChange(task.id, "completed")}>Done</button>
</li>

{editing ? (
  <>
    <input value={name} onChange={(e) => setName(e.target.value)} />
    <button onClick={handleUpdateProject}>Save</button>
  </>
) : (
  <>
    <h2>{project.name}</h2>
    <button onClick={() => setEditing(true)}>Edit</button>
  </>
)}

<button onClick={handleDeleteProject}>Delete Project</button>

    </div>
  );
};

export default ProjectDetails;
