import { LanguageSupport, LRLanguage } from "@codemirror/language";

import { parser } from "@/editor/language/assembly"; // Import generated parser
import { styleTags, tags } from "@lezer/highlight";

export const asmLanguage = LRLanguage.define({
  name: "assembly",
  parser: parser.configure({
    props: [
      styleTags({
        Command: tags.keyword,
        Register: tags.variableName,
        Number: tags.string,
        Address: tags.className,
        Comment: tags.comment,
        Identifier: tags.definition(tags.propertyName),
        Definition: tags.definitionKeyword,
        Label: tags.keyword,
        NumberIdentifier: tags.string,
        AddressIdentifier: tags.className,
        Value: tags.propertyName,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

export function asm() {
  return new LanguageSupport(asmLanguage, []);
}
