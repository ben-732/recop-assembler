import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

interface iDefinitionsProps {
  defs: string;
  setDefs: (value: string) => void;
}

function Definitions({ defs, setDefs }: iDefinitionsProps) {
  return (
    <Card className="max-w-xl mt-8">
      <CardHeader>
        <CardTitle>Definitions</CardTitle>
        <CardDescription>
          These are prepended to the start of the code - should be used for
          things like global variables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={defs}
          onChange={(e) => setDefs(e.target.value)}
          placeholder=":define <name> <value>"
        />
      </CardContent>
    </Card>
  );
}

export default Definitions;
