import { Button } from "@radix-ui/themes";
import { Link } from "lucide-react";
import React from "react";

export default function IssueActions() {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
