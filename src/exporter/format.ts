export interface IExportFormat {
  name: string;
  extension: string;
  mimeType: string;

  export: (lines: string[]) => string;
}
