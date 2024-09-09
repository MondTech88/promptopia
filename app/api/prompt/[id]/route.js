import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db/db";
import { NextResponse } from "next/server";

//Get request to get the post by this [id]

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Prompt.findById(params.id).populate("creator");

    if (!post)
      return NextResponse.json(
        { msg: "Prompt Not Found" },
        { status: 404, statusText: "not found" }
      );

    return NextResponse.json(
      { msg: "success", data: post },
      { status: 200, statusText: "ok" }
    );
  } catch (e) {
    return NextResponse.json(
      { e: { name: e.name, msg: e.message, details: e.errors } },
      { status: 500, statusText: "internal server error" }
    );
  }
};

//Patch request for updating a prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return NextResponse.json(
        { msg: "Prompt not found for update" },
        { status: 404, statusText: "not found" }
      );

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return NextResponse.json(
      { msg: "Success", data: existingPrompt },
      { status: 200, statusText: "ok" }
    );
  } catch (e) {
    return NextResponse.json(
      { e: { name: e.name, msg: e.message, details: e.errors } },
      { status: 500, statusText: "internal server error" }
    );
  }
};

//DELETE request for deleting a prompt.
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return NextResponse.json(
      { msg: "Success" },
      { status: 200, statusText: "ok" }
    );
  } catch (e) {
    NextResponse.json(
      { e: { name: e.name, msg: e.message, details: e.errors } },
      { status: 500, statusText: "internal server error" }
    );
  }
};
