import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    priority: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    dueDate: { type: Date, required: true },
    status: { type: Number, default: -1 },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
