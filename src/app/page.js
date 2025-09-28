"use client";

import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";
import "@/styles/card.css";
import Loading from "@/components/Loading";

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Immediately set loading state
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay

      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch tasks!");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <Loading />;

  // if (!loading && tasks.length === 0) return <p>No Tasks available.</p>;

  return (
    <div className="card-container">
      {tasks?.map((task) => {
        return <TaskCard key={task?._id} task={task} />;
      })}
    </div>
  );
}
