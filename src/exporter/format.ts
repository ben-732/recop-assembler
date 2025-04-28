import { Instruction } from "@/compiler/instruction";

export enum ExportMethod {
  Download,
  NewTab,
}
export interface IExportFormat {
  name: string;
  extension: string;
  mimeType: string;
  allowErrors?: boolean;
  method: ExportMethod;

  export: (lines: Instruction[], raw: string) => string;
}
