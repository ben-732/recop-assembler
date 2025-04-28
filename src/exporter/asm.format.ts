import { Instruction } from "@/compiler/instruction";
import { ExportMethod, IExportFormat } from "./format";

export class AsmFormat implements IExportFormat {
  public readonly mimeType = "text/plain";
  public readonly extension = "asm";
  public readonly name = "Assembly";
  public readonly allowErrors = true;
  public readonly method = ExportMethod.Download;

  export(_compiled: Instruction[], raw: string): string {
    return raw;
  }
}
