import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { asm } from "@/editor/language";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

function Editor({ value, setValue }: Props) {
  return (
    <div className="p-4 max-w-7xl">
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
