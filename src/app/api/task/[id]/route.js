import connectDB from "@/lib/dbConnect";
import Task from "@/models/taskModel";
export async function GET(_, context) {
  try {
    await connectDB();
    const { params } = context;

    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ message: "Id not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const data = await Task.findOne({ _id: id });

    if (!data) {
      return new Response(JSON.stringify({ message: "Data not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function PATCH(req, context) {
  await connectDB();
  const { params } = context;
  const { id } = await params;

  try {
    const requestBody = await req.json();

    if (!requestBody || Object.keys(requestBody).length === 0) {
      return new Response(JSON.stringify({ error: "No data provided" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (requestBody.hasOwnProperty("status")) {
      const { status } = requestBody;

      if (status === undefined || status === null) {
        return new Response(JSON.stringify({ error: "Status is required" }), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return new Response(JSON.stringify({ error: "Task not found" }), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }

      return new Response(JSON.stringify(updatedTask), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const { status, ...otherUpdates } = requestBody;

    if (Object.keys(otherUpdates).length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid fields to update" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(id, otherUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedTask), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

