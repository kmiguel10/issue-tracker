import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueForm from "../../_component/issue-form";

interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params }: Props) {
  console.log(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
}
