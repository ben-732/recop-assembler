import { IExportFormat } from "./format";
import { MifFormat } from "./mif.format";

export enum ExportFormat {
  MIF,
}

export class Exporter {
  private formats: { [key in ExportFormat]: IExportFormat } = {
    [ExportFormat.MIF]: new MifFormat(),
  };

  /**
   * Formats the given input then downloads the appropriate file.
   */
  export(format: ExportFormat, lines: string[]): void {
    const formatted = this.formats[format].export(lines);

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
