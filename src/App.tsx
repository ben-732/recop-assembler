import { useMemo, useState } from "react";
import Editor from "./components/editor";
import Display from "./components/display";
import { compile } from "./compiler/compiler";
import { FileStore } from "./editor/explorer.ts/file-store";
import FileExplorer from "./components/file-explorer";

function App() {
  const [editorState, setEditorState] = useState(
    "ADD R0 R0 R2\nLDR R3 $a1b2\nLDR R4 #c3d4 "
  );

  const store = useMemo(() => new FileStore(true), []);
  const compiled = useMemo(() => compile(editorState), [editorState]);

  return (
    <div className="h-screen w-screen bg-gray-900 p-4">
      <h1 className="text-white font-bold text-xl">ReCOP Assembler</h1>

      <div className="grid grid-cols-[200px_auto] mb-4">
        <FileExplorer store={store} />
        <Editor value={editorState} setValue={setEditorState} />
      </div>
      <Display lines={compiled} />
    </div>
  );
}

export default App;
