import { Compiled } from "@/compiler/compiler";
import { Button } from "./ui/button";
import { Exporter, ExportFormat } from "@/exporter/exporter";

interface DisplayProps {
  lines: Compiled[];
}

function Display({ lines }: DisplayProps) {
  return (
    <div className="text-white w-112 bg-slate-800 p-4 rounded-sm m-4">
      <h2 className="font-bold mb-4 border-b-2 pb-1">Preview</h2>
      <div className="grid grid-cols-[auto_auto_auto] col-gap-8 font-mono text-sm text-gray-400 ">
        <h3 className="font-bold text-white">#</h3>
        <h3 className="font-bold text-white">Hex</h3>
        <h3 className="font-bold text-white">Binary</h3>
        {lines.map((line, index) => (
          <DisplayLine key={index} line={line} />
        ))}
      </div>
      <ExportPanel lines={lines} />
    </div>
  );
}

interface iDisplayLineProps {
  line: Compiled;
}

function DisplayLine({ line: { line, output } }: iDisplayLineProps) {
  if (output.error) {
    return (
      <>
        <span>{line}</span>
        <span className="text-red-500 col-span-2">{output.message}</span>
      </>
    );
  }

  return (
    <div className="grid grid-cols-subgrid col-span-3 hover:text-slate-100 ">
      <span>{line}</span>
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

  const output = lines
    .map((line) => (line.output.error ? "" : line.output.toHexString(false)))
    .filter(() => lines.length > 0);

  return (
    <div className="">
      {/* <h3 className="font-bold text-sm">Export as</h3> */}
      <div className="mt-2 flex gap-2">
        <Button
          className="cursor-pointer"
          onClick={() => exporter.export(ExportFormat.MIF, output)}
        >
          .MIF
        </Button>
      </div>
    </div>
  );
}

export default Display;
