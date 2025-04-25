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
    <>
      <div className="h-screen w-screen bg-gray-900 p-4 ">
        <h1 className="text-white font-bold text-xl">ReCOP Assembler</h1>

        <div className="grid grid-cols-[auto_auto] gap-12">
          <div className="mb-4 ">
            <Editor value={editorState} setValue={setEditorState} />
          </div>
          <div>
            <Display lines={compiled} />
            <HelpComponent />
          </div>
        </div>
      </div>

      <FileExplorer
        store={store}
        setEditorState={setEditorState}
        editorState={editorState}
      />
    </>
  );
}

export default App;
