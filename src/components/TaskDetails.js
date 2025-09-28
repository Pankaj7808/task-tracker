"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { FaNotesMedical } from "react-icons/fa6";
import "@/styles/taskDetails.css";
import "@/styles/card.css";
import Status from "./Status";
import Loading from "./Loading";

function TaskDetails({ id }) {
  const router = useRouter();

  const [task, setTask] = useState(null);

  const handleEditClick = () => {
    router.push(`/task/${id}/edit`);
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/task/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      alert("Task updated successfully:");
      return true;
    } catch (error) {
      alert("Error updating status:");
      return false;
    }
  };

  if (!task) return <Loading />;

  return (
    <div className="task-container">
      <div className="action">
        <button className="tertiary btn">
          <TbSubtask size={20} />
          <span>Subtask</span>
        </button>
        <button className="tertiary btn">
          <FaNotesMedical size={20} />
          <span>Add Note</span>
        </button>
        <button className="primary-btn" onClick={handleEditClick}>
          <MdEdit size={18} />
          <span>Edit</span>
        </button>
      </div>
      <h2 className="task-title">{task?.title || "Untitled Task"}</h2>
      <Status status={task?.status} onChange={handleStatusChange} />
      <p className="task-desc">{task?.desc || "No description available."}</p>

      <div className="task-details">
        <div>
          <b>Priority: </b> <span>{task?.priority}</span>
        </div>
        <div>
          <b>Category: </b> <span>{task?.category || "N/A"}</span>
        </div>
        <div>
          <b>Created At:</b>{" "}
          <span>{moment(task?.createdAt).format("DD-MM-YYYY")}</span>
        </div>
        <div>
          <b>Due Date:</b>{" "}
          <span>{moment(task?.dueDate).format("DD-MM-YYYY")}</span>
        </div>
        <div>
          <b>Tags: </b>{" "}
          <span>{task?.tags?.length > 0 ? task?.tags?.join(",") : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
