import { Compiled } from "@/compiler/compiler";
import { Button } from "./ui/button";
import { Exporter, ExportFormat } from "@/exporter/exporter";
import { DownloadIcon } from "lucide-react";
import { Instruction } from "@/compiler/instruction";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface DisplayProps {
  lines: Compiled[];
}

function Display({ lines }: DisplayProps) {
  return (
    <Card className="max-w-max">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_auto_auto] max-w-max col-gap-8 font-mono text-sm text-gray-400 ">
          <h3 className="font-bold mr-8 text-white">#</h3>
          <h3 className="font-bold mr-24 text-white">Hex</h3>
          <h3 className="font-bold text-white">Binary</h3>
          {lines.map((line, index) => (
            <DisplayLine key={index} line={line} index={index} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <ExportPanel lines={lines} />
      </CardFooter>
    </Card>
  );
}

interface iDisplayLineProps {
  line: Compiled;
  index: number;
}

function DisplayLine({ line: { line, output }, index }: iDisplayLineProps) {
  if (output.error) {
    return (
      <>
        <span>{index + 1}</span>
        <span className="text-red-500 col-span-2">
          (Line {line}) - {output.message}
        </span>
      </>
    );
  }

  return (
    <div className="grid grid-cols-subgrid col-span-3 hover:text-slate-100 ">
      <span>{index + 1}</span>
      <span>{output.toHexString()}</span>
      <span>{output.toBinaryString()}</span>
    </div>
  );
}

interface iExportPanelProps {
  lines: Compiled[];
}

function ExportPanel({ lines }: iExportPanelProps) {
  const exporter = new Exporter();

  const instructions: Instruction[] = useMemo(
    () => lines.map((i) => i.output).filter((i) => !i.error),
    [lines]
  );

  const canExport = useMemo(() => lines.every((i) => !i.output.error), [lines]);

  return (
    <div className="">
      {/* <h3 className="font-bold text-sm">Export as</h3> */}
      <div className="mt-2 flex gap-2">
        {Object.entries(ExportFormat)
          .filter((f) => isNaN(Number(f[0])))
          .map((format) => (
            <Button
              disabled={!canExport}
              key={format[0]}
              className="cursor-pointer"
              onClick={() =>
                exporter.export(format[1] as ExportFormat, instructions)
              }
            >
              <DownloadIcon className="" />.{format[0]}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default Display;
