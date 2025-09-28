import React from "react";
import TaskForm from "@/components/TaskForm";

export default async function TaskPage({ params }) {
    const {id} = await params;
  return <TaskForm id={id} isEdit={true}/>;
}
