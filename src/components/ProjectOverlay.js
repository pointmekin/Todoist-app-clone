import React from 'react';
import { useProjectsValue } from "../contexts"

export const ProjectOverlay = ({setProject, showProjectOverlay, setShowProjectOverlay}) => {
  const projects1 = useProjectsValue();
  const projects = projects1 ? projects1.projects : ['']

  return (
    projects && 
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">

          {projects?.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}

      </div>
    )
  )
} 