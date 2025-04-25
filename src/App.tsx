import { useMemo, useState } from "react";
import Editor from "./components/editor";
import Display from "./components/display";
import { compile } from "./compiler/compiler";
import { FileStore } from "./editor/explorer/file-store";
import FileExplorer from "./components/file-explorer";
import HelpComponent from "./components/help";

function App() {
  const [editorState, setEditorState] = useState("");

  const store = useMemo(() => new FileStore(true), []);
  const compiled = useMemo(() => compile(editorState), [editorState]);

  return (
    <div className="h-screen w-screen bg-gray-900 p-4">
      <h1 className="text-white font-bold text-xl">ReCOP Assembler</h1>
      <FileExplorer
        store={store}
        setEditorState={setEditorState}
        editorState={editorState}
      />
      <div className="max-w-3xl mb-4">
        <Editor value={editorState} setValue={setEditorState} />
      </div>
      <Display lines={compiled} />
      <HelpComponent />
    </div>
  );
}

export default App;
