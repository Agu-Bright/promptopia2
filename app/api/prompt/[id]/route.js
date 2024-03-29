import connectDb from "@utils/connectDb";
import Prompt from "@models/prompt";

//GET single promps
export const GET = async (req, { params }) => {
  try {
    await connectDb;
    const id = params.id;
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch this prompt", { status: 500 });
  }
};

//EDIT single prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectDb;
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("prompt Not Found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update prompt", { status: 500 });
  }
};

//DELETE single prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectDb;
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete prompt", { status: 500 });
  }
};
