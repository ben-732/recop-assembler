import { IFile } from "./file";

const FILE_STORE_KEY = "file-store";

export class FileStore {
  private files: Map<string, IFile> = new Map<string, IFile>();

  constructor(load = false) {
    this.files = new Map<string, IFile>();

    if (load) {
      this.load();
    }
  }

  public save() {
    const files = Array.from(this.files.values());
    localStorage.setItem(FILE_STORE_KEY, JSON.stringify(files));
  }

  public load() {
    const files = localStorage.getItem(FILE_STORE_KEY) ?? "[]";
    if (files) {
      const parsedFiles = JSON.parse(files) as IFile[];
      this.files = new Map<string, IFile>(
        parsedFiles.map((file) => [file.id, file])
      );
    }
  }

  public getFiles(): IFile[] {
    return Array.from(this.files.values());
  }

  public setContent(id: string, content: string): void {
    const file = this.files.get(id);
    if (file) {
      file.content = content;
    }

    this.save();
  }

  public addFile(name: string, content = ""): void {
    const id = crypto.randomUUID();
    const file: IFile = {
      id,
      created: new Date(),
      name,
      content,
    };
    this.files.set(id, file);

    this.save();
  }

  public renameFile(id: string, name: string): void {
    const file = this.files.get(id);
    if (file) {
      file.name = name;
    }

    this.save();
  }

  public deleteFile(id: string): void {
    this.files.delete(id);
    this.save();
  }
}
