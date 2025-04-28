import { Instruction } from "@/compiler/instruction";

const maxAddress = 1024;
const minAddress = 0;
const maxData = "ffffffff";

export function mifExport(lines: Instruction[]): string {
  const firstLine = lines[0].address;
  const lastLine = lines[lines.length - 1].address;

  let bulk_assignment = "";

  if (firstLine > minAddress) {
    bulk_assignment += `\t[${formatAddress(minAddress)}..${formatAddress(
      firstLine - 1
    )}]: ${maxData};\n`;
  }

  if (lastLine < maxAddress) {
    bulk_assignment += `\t[${formatAddress(lastLine + 1)}..${formatAddress(
      maxAddress - 1
    )}]: ${maxData};\n`;
  }

  const content = `${bulk_assignment}${lines
    .map(
      (instruction) =>
        `\t${formatAddress(instruction.address)} : ${instruction.toHexString(
          false
        )};`
    )
    .join("\n")}`;

  return `DEPTH = 1024;\nWIDTH = 32;\n\nADDRESS_RADIX = HEX;\nDATA_RADIX = HEX;\n\nCONTENT BEGIN\n${content}\nEND;`;
}

function formatAddress(address: number): string {
  return address.toString(16).toUpperCase().padStart(3, "0");
}
