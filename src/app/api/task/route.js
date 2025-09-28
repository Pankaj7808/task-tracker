import connectDB from "@/lib/dbConnect";
import Task from "@/models/taskModel";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const newTask = new Task(body);
    await newTask.save();

    return new Response(
      JSON.stringify({ message: "Task created successfully.", data: newTask }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Task ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return new Response(
        JSON.stringify({ error: "Task not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Task deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

