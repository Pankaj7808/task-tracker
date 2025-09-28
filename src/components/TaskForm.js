"use client";

import React, { useEffect, useState } from "react";
import "@/styles/taskForm.css";
import Loading from "./Loading";

function TaskForm({ isEdit, id }) {
  const [data, setData] = useState({
    title: "",
    desc: "",
    priority: "",
    category: "",
    tags: "",
    dueDate: "",
  });

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/task/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const {status, ...modifiedData} = data;
        setData({
          ...modifiedData,
          tags: data.tags ? data.tags.join(", ") : "",
          dueDate: data.dueDate
            ? new Date(data.dueDate).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...data,
      tags: data?.tags?.split(",")?.map((tag) => tag.trim()),
      dueDate: new Date(data.dueDate),
    };
    console.log("Formatted Data:", data);
    try {
      const baseUrl = isEdit ? `http://localhost:3000/api/task/${id}` : "http://localhost:3000/api/task";
      const response = await fetch(baseUrl, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        alert(isEdit ? "Task updated successfully!" : "Task created successfully!");
        setData({
          title: "",
          desc: "",
          priority: "",
          tags: "",
          dueDate: "",
          category: "",
        }); 
      } else {
        alert(isEdit ? "Failed to update task!" : "Failed to create task!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(isEdit ? "Failed to update task!" : "Failed to create task!");
    }
  };

  if (isLoading) return <Loading/>;

  if (!isClient) return null;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="desc"
          value={data.desc}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label>Priority</label>
        <select
          name="priority"
          value={data.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Category</label>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div>
        <label>Tags</label>
        <input
          type="text"
          name="tags"
          value={data.tags}
          onChange={handleChange}
          placeholder="Enter tags (comma separated)"
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={data.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit" className="primary-btn">
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
