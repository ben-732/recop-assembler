import { Compiled } from "@/compiler/compiler";
import { Instruction } from "@/compiler/instruction";
import React from "react";

interface DisplayProps {
  lines: Compiled[];
}

function Display({ lines }: DisplayProps) {
  return (
    <div className="text-white w-112 bg-slate-800 p-4 rounded-sm m-4">
      <h2 className="font-bold mb-4 border-b-2 pb-1">Compiled</h2>
      <div className="grid grid-cols-[auto_auto_auto] col-gap-8 font-mono text-sm text-gray-400 ">
        <h3 className="font-bold text-white">#</h3>
        <h3 className="font-bold text-white">Hex</h3>
        <h3 className="font-bold text-white">Binary</h3>
        {lines.map((line, index) => (
          <DisplayLine key={index} line={line} />
        ))}
      </div>
    </div>
  );
}

function DisplayLine({ line: { output, line } }: { line: Compiled }) {
  if (typeof output === "string") {
    return (
      <>
        <span>{line}</span>
        <span className="text-red-500 col-span-2">{output}</span>
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

export default Display;
