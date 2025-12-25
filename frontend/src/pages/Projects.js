import { useEffect, useState } from "react";
import { getProjects } from "../api/api";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getProjects()
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <strong>{project.name}</strong>
              </Link>{" "}
              — {project.status}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
