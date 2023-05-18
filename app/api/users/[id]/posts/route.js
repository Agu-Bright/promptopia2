import connectDb from "@utils/connectDb";
import Prompt from "@models/prompt";

//get a users profile
export const GET = async (req, { params }) => {
  try {
    await connectDb;
    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    if (!posts) return new Response("No Post found", { status: 404 });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
