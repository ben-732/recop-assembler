import { Instruction } from "@/compiler/instruction";

export interface IExportFormat {
  name: string;
  extension: string;
  mimeType: string;
  allowErrors?: boolean;

  export: (lines: Instruction[], raw: string) => string;
}
