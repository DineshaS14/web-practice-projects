import { NextResponse } from "next/server";

const { default: connectMongoDB } = require("@/app/libs/mongodb");

export async function PUT(request, { params}) {
    const { id } = params;
    const {newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description});
    return NextResponse.json({message: "Topic updated"}, {status: 200});
} // PUT

export async function GET(request, { params}) {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findOne({_id : id});
    return NextResponse.json({topic}, {status: 200 });
} // GET with PARAM