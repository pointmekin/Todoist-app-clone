import React, {useEffect} from 'react';
import { useTasks } from '../hooks';
import { Checkbox } from "./Checkbox"
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers"
import { useSelectedProjectValue, useProjectsValue } from "../contexts"
import { AddTask } from './AddTask';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  

  console.log(tasks)
  console.log("selected Project: " + selectedProject)

  let projectName = ''

  if (projects.length && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
    console.log('projectName 1: ', projectName)
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    console.log('projectName 2: ', projectName)
  }

  useEffect(() => {
    document.title = projectName + ": Todoist"
    return () => {
      console.log("hi")
    }
  }, [projectName])

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {
          tasks.map(task=> {
            return (<li key={`${task.id}`}>
              <Checkbox id={task.id} taskDesc={task.task}/>
              <span>{task.task}</span>
            </li>)
          })
        }
      </ul>
      <AddTask/>
    </div>
  )
}