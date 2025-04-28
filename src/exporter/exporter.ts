import { Instruction } from "@/compiler/instruction";
import { BinFormat } from "./bin.format";
import { IExportFormat } from "./format";
import { MifFormat } from "./mif.format";
import { AsmFormat } from "./asm.format";

export enum ExportFormat {
  MIF,
  BIN,
  ASM,
}

export class Exporter {
  private formats: { [key in ExportFormat]: IExportFormat } = {
    [ExportFormat.MIF]: new MifFormat(),
    [ExportFormat.BIN]: new BinFormat(),
    [ExportFormat.ASM]: new AsmFormat(),
  };

  /**
   * Formats the given input then downloads the appropriate file.
   */
  export(format: ExportFormat, instructions: Instruction[], raw: string): void {
    const formatted = this.formats[format].export(instructions, raw);

    const blob = new Blob([formatted], { type: this.formats[format].mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${this.formats[format].extension}`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }

  allowsErrors(format: ExportFormat): boolean {
    return this.formats[format].allowErrors === true;
  }
}
