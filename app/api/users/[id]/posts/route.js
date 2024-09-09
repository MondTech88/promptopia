import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const id = params.id;
    const userPosts = await Prompt.find({ creator: id }).populate("creator");
    return NextResponse.json(
      { user: { posts: userPosts } },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    return NextResponse.json(
      { e: { name: e.name, msg: e.message, details: e.errors } },
      { status: 500, statusText: "internal server error" }
    );
  }
};
