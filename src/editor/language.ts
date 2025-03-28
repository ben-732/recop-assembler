import { LRLanguage } from "@codemirror/language";

import { parser } from "@/editor/grammar/assembler"; // Import generated parser
import { styleTags, tags } from "@lezer/highlight";

// Create a simple parser (stub for now)
const asmParser = parser.configure({
  props: [
    styleTags({
      Command: tags.keyword,
      Register: tags.variableName,
      Number: tags.number,
    }),
  ],
});

export const asmLanguage = LRLanguage.define({
  name: "asm",
  parser: asmParser,
  languageData: {
    commentTokens: {
      line: ";",
    },
  },
});

export function asm() {
  return asmLanguage;
}
