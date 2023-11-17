"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export default function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger>Filter by status...</Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ?? "ALL"}>
            {status.value ? status.label : "All"}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
