import { useMemo, useState } from "react";
import Editor from "./components/editor";
import Display from "./components/display";
import { compile } from "./compiler/compiler";

function App() {
  const [value, setValue] = useState("ADD R0 R1");

  const compiled = useMemo(() => compile(value), [value]);

  return (
    <div className="h-screen w-screen bg-gray-900 p-4">
      <h1 className="text-white font-bold text-xl">ReCOP Assembler</h1>

      <Editor value={value} setValue={setValue} />
      <Display lines={compiled} />
    </div>
  );
}

export default App;
