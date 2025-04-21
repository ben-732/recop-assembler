import { FileStore } from "@/editor/explorer.ts/file-store";
import { useCallback, useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { IFile } from "@/editor/explorer.ts/file";

interface FileExplorerProps {
  store: FileStore;
  editorState: string;
  setEditorState: (value: string) => void;
}

const SELECTED_FILE_KEY = "selected-file";

function FileExplorer({
  store,
  setEditorState,
  editorState,
}: FileExplorerProps) {
  const [files, setFiles] = useState<IFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(
    localStorage.getItem(SELECTED_FILE_KEY) ?? null
  );

  useEffect(() => {
    if (selectedFile === null) return;
    const file = files.find((file) => file.id === selectedFile);
    if (!file) return;

    setEditorState?.(file.content ?? "");

    localStorage.setItem(SELECTED_FILE_KEY, file.id);
  }, [selectedFile, files]);

  const updateState = useCallback(() => {
    setFiles(store.getFiles());
  }, [store, setFiles]);

  useEffect(() => {
    store.load();
    updateState();
  }, [store, updateState]);

  useEffect(() => {
    if (!editorState || !selectedFile || !store) {
      return;
    }

    store.setContent(selectedFile, editorState);
  }, [editorState]);

  const handleSelect = (id: string, event?: React.MouseEvent) => {
    // Check if double click
    if (event && event.detail === 2) {
      event.stopPropagation();
      const file = files.find((file) => file.id === id);
      if (!file) return;
      const newName = prompt("Enter new file name", file.name) ?? file.name;
      store.renameFile(file.id, newName);
      updateState();
      return;
    }

    // Save old file content
    if (selectedFile && store) {
      store.save();
    }

    const file = files.find((file) => file.id === id);
    setSelectedFile(file ? file.id : null);
  };

  useEffect(() => {
    if (selectedFile !== null || !files?.length) return;

    const file = files[0];
    handleSelect(file.id);
  }, [files, selectedFile]);

  const handleDelete = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();

    if (!confirm("Are you sure you want to delete this file?")) {
      return;
    }

    store.deleteFile(id);
    updateState();
  };

  const handleAdd = () => {
    const fileName = prompt("Enter file name", "New File") ?? "New File";
    store.addFile(fileName);
    updateState();
  };

  return (
    <div className="  bg-gray-800 pt-1 select-none">
      <div className="flex flex-col h-full">
        <p className="px-2 text-white">Files</p>
        {files.map((file) => (
          <div
            key={file.id}
            className={`bg-gray-800 text-gray-300 hover:bg-gray-700 px-2 flex items-center ${
              selectedFile === file.id ? "bg-slate-700" : ""
            } cursor-pointer`}
            onClick={(e) => {
              handleSelect(file.id, e);
            }}
          >
            <span className=" ">{file.name}</span>
            <div className="flex-grow"></div>

            <TrashIcon
              size={16}
              onClick={(event) => handleDelete(event, file.id)}
            />
          </div>
        ))}

        <div className="flex-grow"></div>
        <button
          className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-2 py-1 "
          onClick={() => {
            handleAdd();
          }}
        >
          New File
        </button>
      </div>
    </div>
  );
}

export default FileExplorer;
