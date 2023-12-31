import authOptions from "@/app/auth/authOptions";
import { PatchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  params: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  //validate the body
  const validation = PatchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  //if there is a userId, ensure that it is a valid user
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User." }, { status: 400 });
    }
  }

  //find the issue with given id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  //update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  params: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  //Fetch issue with the given id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
