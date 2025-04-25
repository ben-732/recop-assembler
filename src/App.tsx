import { useEffect, useMemo, useState } from "react";
import Editor from "./components/editor";
import Display from "./components/display";
import { compile } from "./compiler/compiler";
import { FileStore } from "./editor/explorer/file-store";
import FileExplorer from "./components/file-explorer";
import HelpComponent from "./components/help";
import DefinitionsComponent from "./components/definitions.component";

const START_ADDRESS_KEY = "start-address";
const DEFS_KEY = "defs";

function App() {
  const [editorState, setEditorState] = useState("");
  const [startAddress, setStartAddress] = useState(
    parseInt(localStorage.getItem(START_ADDRESS_KEY) ?? "0", 10) || 0
  );

  const [defs, setDefs] = useState<string>(
    localStorage.getItem(DEFS_KEY) ?? ""
  );

  const store = useMemo(() => new FileStore(true), []);
  const compiled = useMemo(
    () => compile(defs + "\n" + editorState, startAddress),
    [defs, editorState, startAddress]
  );

  useEffect(() => {
    localStorage.setItem(START_ADDRESS_KEY, startAddress.toString());
  }, [startAddress]);

  useEffect(() => {
    localStorage.setItem(DEFS_KEY, defs);
  }, [defs]);

  return (
    <>
      <div className="w-full bg-gray-900 p-4 min-h-screen ">
        <h1 className="text-white font-bold text-xl">ReCOP Assembler</h1>

        <div className="grid grid-cols-[auto_auto] gap-12">
          <div className="mb-4 ">
            <Editor value={editorState} setValue={setEditorState} />
          </div>
          <div>
            <Display
              lines={compiled}
              startAddress={startAddress}
              setStartAddress={setStartAddress}
            />
            <HelpComponent />
            <DefinitionsComponent defs={defs} setDefs={setDefs} />
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
