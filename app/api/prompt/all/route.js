import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate("creator");
    return NextResponse.json(
      { msg: "Success", posts: posts },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    return NextResponse.json(
      {
        e: { name: error.name, msg: error.message, details: error.errors },
      },
      { status: 500, statusText: "internal server error" }
    );
  }
};
