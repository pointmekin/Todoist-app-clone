import React from "react";
import moment from "moment";
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from "react-icons/fa";

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  return (
    <>
      {showTaskDate && (
        <div className="task-date" data-testid="task-date-overlay">
          <ul className="task-date__list">
            <li key="today">
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().format("DD/MM/YYYY"));
                  console.log(moment().format("DD/MM/YYYY"));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowTaskDate(false);
                    setTaskDate(moment().format("DD/MM/YYYY"));
                    console.log(moment().format("DD/MM/YYYY"));
                  }
                }}
                className="p-0 m-0"
                
                tabIndex={0}
                role="button"
                data-testid="task-date-today"
                aria-label="Select today as the task date"
              >
                <span className="task-date__icon">
                  <FaSpaceShuttle />
                </span>
                <span>Today</span>
              </div>
            </li>
            <li key="tomorrow">
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
                }}
                onKeyDown={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
                }}
                data-testid="task-date-tomorrow"
                className="p-0 m-0"
                
                tabIndex={0}
                aria-label="Select tomorrow as the task date"
                role="button"
              >
                <span className="task-date__icon">
                  <FaSun />
                </span>
                <span>Tomorrow</span>
              </div>
            </li>
            <li key="next7days">
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowTaskDate(false);
                    setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
                  }
                }}
                data-testid="task-date-7days" 
                
                className="p-0 m-0"
                tabIndex={0}
                role="button"
                aria-label="Select next week as the task date"
              >
                <span className="task-date__icon">
                  <FaRegPaperPlane />
                </span>
                <span>Next week</span>
              </div>
              
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
