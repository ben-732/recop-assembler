import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { asm } from "@/editor/language";
import { useEffect, useState } from "react";
import { parser } from "./editor/grammar/assembler";

function App() {
  const [value, setValue] = useState("MOV R0");

  useEffect(() => {
    const tree = parser.parse(value);
    console.log(tree.toString());
  }, [value]);

  return (
    <div className="h-screen w-screen bg-gray-900 p-4">
      <h1 className="text-white font-bold  text-xl">ReCOP Assembler</h1>

      <div className="p-4 max-w-7xl">
        <CodeMirror
          theme={dracula}
          height="400px"
          extensions={[basicSetup(), asm()]}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
