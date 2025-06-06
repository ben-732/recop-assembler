import { Instruction } from "@/compiler/instruction";
import { ExportMethod, IExportFormat } from "./format";
import { mifExport } from "./mif-export";

export class MifFormat implements IExportFormat {
  public readonly name = "MIF";
  public readonly extension = "mif";
  public readonly mimeType = "text/plain";
  public readonly method = ExportMethod.Download;

  export(lines: Instruction[]): string {
    return mifExport(lines);
  }
}
