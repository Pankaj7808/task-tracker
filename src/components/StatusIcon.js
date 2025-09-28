import React from "react";
import "@/styles/status.css";

function StatusIcon({ status, showTitle, size }) {
  return (
    <>
      {status === -1 && (
        <div
          className={size === "small" ? "status one small" : "status one"}
          title={showTitle ? "To Do" : ""}
        ></div>
      )}
      {status === 0 && (
        <div
          className="status two"
          title={showTitle ? "In Progress" : ""}
        ></div>
      )}
      {status === 1 && (
        <div
          className="status three"
          title={showTitle ? "Completed" : ""}
        ></div>
      )}
    </>
  );
}

export default StatusIcon;
