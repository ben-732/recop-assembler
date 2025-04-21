import { FileStore } from "@/editor/explorer.ts/file-store";
import { useEffect } from "react";
import { TrashIcon } from "lucide-react";

interface FileExplorerProps {
  store: FileStore;
}

function FileExplorer({ store }: FileExplorerProps) {
  useEffect(() => {
    store.load();
  }, [store]);

  const files = store.getFiles();

  return (
    <div className="  bg-gray-800 pt-1 select-none">
      <div className="flex flex-col h-full">
        <p className="px-2 text-white">Files</p>
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-gray-800 hover:bg-gray-700 px-2 flex items-center"
          >
            <span className="text-gray-400 ">{file.name}</span>
            <div className="flex-grow"></div>

            <TrashIcon size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
