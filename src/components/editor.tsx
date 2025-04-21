import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { asm } from "@/editor/language";
import { useEffect } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

function Editor({ value, setValue }: Props) {
  // console.log(dracula);

  useEffect(() => {
    // console.log("Parsing value:", value);
    // console.log(asmLanguage.parser.parse(value).toString());
  }, [value]);

  return (
    <div className="max-w-7xl">
      <CodeMirror
        height="400px"
        theme={dracula}
        extensions={[dracula, asm(), basicSetup()]}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </div>
  );
}

export default Editor;
