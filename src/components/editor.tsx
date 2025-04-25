import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { asm } from "@/editor/language";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

function Editor({ value, setValue }: Props) {
  return (
    <div>
      <CodeMirror
        height="900px"
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
