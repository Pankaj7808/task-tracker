import React from "react";
import TaskDetails from "@/components/TaskDetails";

export default async function TaskPage({ params }) {
    const {id} = await params;
  return <TaskDetails id={id} />;
}
