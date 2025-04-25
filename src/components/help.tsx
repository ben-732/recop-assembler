import React from "react";
import { Card, CardContent } from "./ui/card";

function HelpComponent() {
  return (
    <Card className="max-w-max mt-8">
      <CardContent>
        <h1 className="text-md font-medium">Variable Syntax</h1>
        <ul className="text-sm list-disc ml-6">
          <li>
            Define:{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              :define {"<name>"} {"<value>"}
            </span>
          </li>
          <li className="mt-2">
            Use as an address:{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              @name
            </span>
          </li>
          <li className="mt-2">
            Use as an operand:{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              !name
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default HelpComponent;
