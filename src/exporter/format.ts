import { Instruction } from "@/compiler/instruction";

export interface IExportFormat {
  name: string;
  extension: string;
  mimeType: string;

  export: (lines: Instruction[], raw: string) => string;
}
