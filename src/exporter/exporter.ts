import { Instruction } from "@/compiler/instruction";
import { BinFormat } from "./bin.format";
import { ExportMethod, IExportFormat } from "./format";
import { MifFormat } from "./mif.format";
import { MifContentFormat } from "./mif-content.format";
import { AsmFormat } from "./asm.format";

export enum ExportFormat {
  MIF,
  MIF_CONTENT,
  BIN,
  ASM,
}

export class Exporter {
  private formats: { [key in ExportFormat]: IExportFormat } = {
    [ExportFormat.MIF]: new MifFormat(),
    [ExportFormat.MIF_CONTENT]: new MifContentFormat(),
    [ExportFormat.BIN]: new BinFormat(),
    [ExportFormat.ASM]: new AsmFormat(),
  };

  /**
   * Formats the given input then downloads the appropriate file.
   */
  export(format: ExportFormat, instructions: Instruction[], raw: string): void {
    const formatted = this.formats[format].export(instructions, raw);

    const f = this.get(format);

    if (f.method === ExportMethod.Download) {
      const blob = new Blob([formatted], {
        type: this.formats[format].mimeType,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `output.${this.formats[format].extension}`;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }

    if (f.method === ExportMethod.NewTab) {
      const blob = new Blob([formatted], {
        type: this.formats[format].mimeType,
      });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  }

  get(format: ExportFormat): IExportFormat {
    return this.formats[format];
  }
}
