import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDB();

    const post = await req.json();

    const prompt = new Prompt(post);
    await prompt.save();

    return NextResponse.json(
      { msg: "Success", post: prompt },
      { status: 201, statusText: "created" }
    );
  } catch (error) {
    if (error.name === "ValidationError")
      return NextResponse.json(
        {
          e: {
            name: error.name,
            msg: error.message,
            details: error.errors,
          },
        },
        { status: 400 }
      );
    return NextResponse.json(
      {
        e: {
          name: error.name,
          msg: error.message,
          details: error.errors,
        },
      },
      { status: "500" }
    );
  }
};
