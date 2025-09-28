"use client";
import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "@/styles/card.css";
import StatusIcon from "./StatusIcon";

function TaskCard({ task }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task?._id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      alert("Task deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("Error deleting task:", error);
    }
  };

  const handleView = () => {
    router.push(`/task/${task?._id}`);
  };

  return (
    <div className="task-card">
      <div className="card-header">
        <StatusIcon status={task?.status} showTitle={true}/>
        <h3>{task?.title}</h3>
      </div>
      <p>{task?.desc}</p>
      <div className="task-meta">
        <b>Created At:</b>{" "}
        <span>{moment(task?.createdAt).format("DD-MM-YYYY")}</span>
      </div>
      <div className="task-meta">
        <b>Due Date:</b>{" "}
        <span>{moment(task?.dueDate).format("DD-MM-YYYY")}</span>
      </div>
      <div className="task-meta">
        <b>Priority:</b> <span>{task?.priority}</span>
      </div>
      <div className="card-action" onClick={handleView}>
        <button className="btn secondary ">
          <IoEye size={20} />
          <span>View</span>
        </button>
        <button className="btn primary " onClick={handleDelete}>
          <MdDelete size={20} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
