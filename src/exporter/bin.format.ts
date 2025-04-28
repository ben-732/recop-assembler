import { Instruction } from "@/compiler/instruction";
import { ExportMethod, IExportFormat } from "./format";

export class BinFormat implements IExportFormat {
  public readonly mimeType = "application/octet-stream";
  public readonly extension = "bin";
  public readonly name = "Binary";
  public readonly method = ExportMethod.Download;

  export(lines: Instruction[]): string {
    return lines.map((i) => i.toBinaryString(true)).join("\n");
  }
}
