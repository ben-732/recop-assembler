import { Instruction } from "@/compiler/instruction";
import { IExportFormat } from "./format";

export class AsmFormat implements IExportFormat {
  public readonly mimeType = "text/plain";
  public readonly extension = "asm";
  public readonly name = "Assembly";
  public readonly allowErrors = true;

  export(_compiled: Instruction[], raw: string): string {
    return raw;
  }
}
