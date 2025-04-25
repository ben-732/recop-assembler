import { Instruction } from "@/compiler/instruction";
import { BinFormat } from "./bin.format";
import { IExportFormat } from "./format";
import { MifFormat } from "./mif.format";

export enum ExportFormat {
  MIF,
  BIN,
}

export class Exporter {
  private formats: { [key in ExportFormat]: IExportFormat } = {
    [ExportFormat.MIF]: new MifFormat(),
    [ExportFormat.BIN]: new BinFormat(),
  };

  /**
   * Formats the given input then downloads the appropriate file.
   */
  export(format: ExportFormat, instructions: Instruction[]): void {
    const formatted = this.formats[format].export(instructions);

    const blob = new Blob([formatted], { type: this.formats[format].mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${this.formats[format].extension}`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }
}
