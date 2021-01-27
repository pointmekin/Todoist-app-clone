import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../contexts/selected-project-context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";
import { getElementError } from "@testing-library/react";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const selectedProject = useSelectedProjectValue();


  const addTask = () => {
    const projectId = project || selectedProject?.selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().add(0, "day").format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "testuserid",
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          aria-label="Add task"
          onClick={() => {
            setShowMain(!showMain);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") setShowMain(!showMain);
          }}
          tabIndex={0}
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <div data-testid="quick-add-task">
              <h2 className="header">Quick Add Task</h2>
              <span
                className="add-task__cancel-x"
                aria-label="Cancel adding a task"
                data-testid="add-task-quick-cancel"
                onClick={() => {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                  setShowQuickAddTask(false);
                }}
                onKeyDown={(e) => {
                  if (e.key ==="Enter") {
                    setShowMain(false);
                  setShowProjectOverlay(false);
                  setShowQuickAddTask(false);
                  }
                }}
              >
                X
              </span>
            </div>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
            onKeyDown={(e) =>
              {if (e.key !== "Enter") return null
              {showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()}}
            }
          >
            Add Task
          </button>

          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return null
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}

          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {if (e.key === "Enter") setShowProjectOverlay(!showProjectOverlay)}}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => {
              setShowTaskDate(!showTaskDate);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return null
              setShowTaskDate(!showTaskDate);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
