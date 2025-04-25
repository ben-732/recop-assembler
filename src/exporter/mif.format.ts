import { Instruction } from "@/compiler/instruction";
import { IExportFormat } from "./format";

export class MifFormat implements IExportFormat {
  name = "MIF";
  extension = "mif";
  mimeType = "text/plain";

  export(lines: Instruction[]): string {
    const splitLines = [];

    // Each line is 16 bits (4 hex chars) so need to split the line in half
    for (const line of lines) {
      splitLines.push(line.toHexString(false));
    }

    return `DEPTH = 1024;\nWIDTH = 32;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN\n${splitLines
      .map((line, index) => `\t${index.toString(16).toUpperCase()} : ${line};`)
      .join("\n")}\nEND;`;
  }
}
