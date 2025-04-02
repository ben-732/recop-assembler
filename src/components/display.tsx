import { Instruction } from "@/compiler/instruction";
import React from "react";

interface DisplayProps {
  lines: Instruction[];
}

function Display({ lines }: DisplayProps) {
  return (
    <div className="text-white w-108 bg-slate-800 p-4 rounded-sm m-4">
      <h2 className="font-bold mb-4 border-b-2 pb-1">Compiled</h2>
      <div className="grid grid-cols-[auto_auto] font-mono text-sm text-gray-400">
        <h3 className="font-bold text-white">Hex</h3>
        <h3 className="font-bold text-white">Binary</h3>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            <span>{line.toHexString()}</span>
            <span>{line.toBinaryString()}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Display;
