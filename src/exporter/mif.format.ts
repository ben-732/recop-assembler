import { Instruction } from "@/compiler/instruction";
import { IExportFormat } from "./format";

export class MifFormat implements IExportFormat {
  name = "MIF";
  extension = "mif";
  mimeType = "text/plain";

  export(lines: Instruction[]): string {
    return `DEPTH = 1024;\nWIDTH = 32;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN\n\t[00..3FF]: FFFFFFFF;\n${lines
      .map(
        (instruction) =>
          `\t${instruction.address
            .toString(16)
            .toUpperCase()} : ${instruction.toHexString(false)};`
      )
      .join("\n")}\nEND;`;
  }
}
