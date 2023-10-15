import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

//use to validate the body of the request
const createIssueSchema = z.object({
  title: z.string().min(1, "Missing required number of characters").max(255),
  description: z.string().min(1, "Missing required number of characters"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  //validate the body of the request
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
