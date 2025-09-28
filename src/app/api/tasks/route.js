import Task from '@/models/taskModel'
import connectDB from "@/lib/dbConnect";

export async function GET() {
  await connectDB();

  const data = await Task.find({});

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
