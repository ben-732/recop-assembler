import { LanguageSupport, LRLanguage } from "@codemirror/language";

import { parser } from "@/editor/language/assembly"; // Import generated parser
import { styleTags, tags } from "@lezer/highlight";

export const asmLanguage = LRLanguage.define({
  name: "assembly",
  parser: parser.configure({
    props: [
      styleTags({
        Command: tags.keyword,
        Register: tags.atom,
        Number: tags.number,
        ArgList: tags.meta,
        Arg: tags.variableName,
        Statement: tags.comment,
      }),
    ],
  }),
});

export function asm() {
  return new LanguageSupport(asmLanguage, []);
}
