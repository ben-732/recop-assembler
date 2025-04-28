import { Instruction } from "@/compiler/instruction";
import { IExportFormat } from "./format";

const maxAddress = 1024;
const minAddress = 0;
const maxData = "ffffffff";

export class MifFormat implements IExportFormat {
  name = "MIF";
  extension = "mif";
  mimeType = "text/plain";

  export(lines: Instruction[]): string {
    const firstLine = lines[0].address;
    const lastLine = lines[lines.length - 1].address;

    let bulk_assignment = "";

    if (firstLine > minAddress) {
      bulk_assignment += `\t[${this.formatAddress(
        minAddress
      )}..${this.formatAddress(firstLine - 1)}]: ${maxData};\n`;
    }

    if (lastLine < maxAddress) {
      bulk_assignment += `\t[${this.formatAddress(
        lastLine + 1
      )}..${this.formatAddress(maxAddress - 1)}]: ${maxData};\n`;
    }

    return `DEPTH = 1024;\nWIDTH = 32;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN\n${bulk_assignment}${lines
      .map(
        (instruction) =>
          `\t${this.formatAddress(
            instruction.address
          )} : ${instruction.toHexString(false)};`
      )
      .join("\n")}\nEND;`;
  }

  private formatAddress(address: number): string {
    return address.toString(16).toUpperCase().padStart(3, "0");
  }
}
