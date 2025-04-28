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
import { Input } from "./ui/input";

interface DisplayProps {
  lines: Compiled[];
  startAddress: number;
  setStartAddress: (startAddress: number) => void;
  raw: string;
}

function Display({
  lines,
  startAddress,
  setStartAddress,
  raw: editorState,
}: DisplayProps) {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Output
          <div className="flex-grow"></div>
          <Input
            className="w-24"
            placeholder="Start $0"
            type="number"
            value={startAddress}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                setStartAddress(value);
              }
            }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_auto_auto] max-w-max col-gap-8 font-mono text-sm text-gray-400 ">
          <h3 className="font-bold mr-12 text-white">#</h3>
          <h3 className="font-bold mr-24 text-white">Hex</h3>
          <h3 className="font-bold text-white">Binary</h3>
          {lines.map((line, index) => (
            <DisplayLine key={index} line={line} index={index} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <ExportPanel lines={lines} raw={editorState} />
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
      <span>0x{output.address.toString(16).padStart(2, "0")}</span>
      <span>{output.toHexString()}</span>
      <span>{output.toBinaryString()}</span>
    </div>
  );
}

interface iExportPanelProps {
  lines: Compiled[];
  raw: string;
}

function ExportPanel({ lines, raw: editorState }: iExportPanelProps) {
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
              disabled={
                !canExport && !exporter.allowsErrors(format[1] as ExportFormat)
              }
              key={format[0]}
              className="cursor-pointer"
              onClick={() =>
                exporter.export(
                  format[1] as ExportFormat,
                  instructions,
                  editorState
                )
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
