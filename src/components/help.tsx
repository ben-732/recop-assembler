import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

function HelpComponent() {
  return (
    <Card className="max-w-xl mt-8">
      <CardContent className="text-sm">
        <h1 className="text-md font-medium">Variable Syntax</h1>
        <ul className="list-disc ml-6 mt-2">
          <li>
            Define:{" "}
            <Code>
              :define {"<name>"} {"<value>"}
            </Code>
          </li>
          <li className="mt-2">
            Use as an address: <Code>@name</Code>
          </li>
          <li className="mt-2">
            Use as an operand: <Code>!name</Code>
          </li>
          <li className="mt-2">
            Label: <Code>--LABEL_NAME</Code>
          </li>
          <li className="mt-2">
            Use Label: <Code>JMP LABEL_NAME</Code>
          </li>
        </ul>

        <h1 className="text-md font-medium mt-4">Other Info</h1>
        <p>
          Add definitions to the text below above and they will be prepended to
          the file pre-compilation
        </p>
        <p className="mt-2">
          Set the start address for program memory from the preview pane
        </p>
      </CardContent>
    </Card>
  );
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

function Code({ children, className }: CodeProps) {
  return (
    <span
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export default HelpComponent;
