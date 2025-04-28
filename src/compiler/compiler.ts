import { Instruction, InstructionPartKey } from "./instruction";
import { AssemblyLine } from "./assembly-line";
import { parseCommand } from "./opcodes";
import { DefinitionManager } from "./definitions";
import { containsJoinString } from "@/utils/join-string";

interface LineWithMetadata {
  number: number;
  value: string;
  error?: {
    message: string;
  };
}

type LineError = { error: true; message: string };
type InstructionOrError = Instruction | LineError;
export type Compiled = { line: number; output: InstructionOrError };

export function compile(input: string, startAddress = 0): Compiled[] {
  const definitions = new DefinitionManager(startAddress);

  const rawLines = associateLineNumbers(input.split("\n"));
  const lines = preprocess(rawLines, definitions);

  console.log("Lines", lines);

  const instructions: Compiled[] = [];

  for (const line of lines) {
    if (line.error) {
      instructions.push({
        line: line.number,
        output: { error: true, message: line.error.message },
      });
      continue;
    }

    try {
      const asmLine = new AssemblyLine(line.value, definitions);

      if (asmLine.parts.length === 0) {
        continue;
      }

      const addr = definitions.nextAddress();

      const command = parseCommand(asmLine.getCommand());

      const instruction = new Instruction(addr);

      instruction.setPart(InstructionPartKey.OpCode, command.value);

      const parts = asmLine.parseArguments(command);

      for (const partKey in parts) {
        const typedKey = partKey as InstructionPartKey;

        const partValue = parts[typedKey];
        if (partValue !== undefined) {
          instruction.setPart(partKey as InstructionPartKey, partValue);
        }
      }

      // Set Address Mode to Immediate

      instructions.push({
        line: line.number,
        output: instruction,
      });
    } catch (error) {
      instructions.push({
        line: line.number,
        output: { error: true, message: `${error}`.replace("\n", " ") },
      });
      continue;
    }
  }

  console.log("Instructions", instructions);

  return instructions;
}

/**
 * Add line numbers to instructions
 */
function associateLineNumbers(lines: string[]): LineWithMetadata[] {
  let rawLines = lines;
  const output: LineWithMetadata[] = [];

  const joinIndex = lines.findIndex((line) => containsJoinString(line));
  if (joinIndex !== -1) {
    for (let i = 0; i <= joinIndex; i++) {
      const line = rawLines[i];
      output.push({
        number: 0,
        value: line,
      });
    }

    rawLines = rawLines.slice(joinIndex + 1);
  }

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    output.push({
      number: i + 1,
      value: line,
    });
  }

  return output;
}

/**
 * Adds definitions and labels, filters out empty lines
 *
 * @returns
 */
function preprocess(
  lines: LineWithMetadata[],
  definitions: DefinitionManager
): LineWithMetadata[] {
  const output: LineWithMetadata[] = [];

  for (const line of lines) {
    const lineValue = removeComment(line.value).trim();

    if (lineValue.length === 0) {
      continue;
    }

    const isDefinition = lineValue.startsWith(":define");
    const isLabel = lineValue.startsWith("--");

    if (!isDefinition && !isLabel) {
      definitions.nextAddress();
      output.push(line);
      continue;
    }

    try {
      if (isDefinition) {
        definitions.newDefinition(lineValue);
      }

      if (isLabel) {
        definitions.newLabel(lineValue);
      }
    } catch (error) {
      output.push({
        ...line,
        error: {
          message: `${error}`.replace("\n", " "),
        },
      });
      continue;
    }
  }

  definitions.resetAddress();
  return output;
}

function removeComment(line: string): string {
  const commentIndex = line.indexOf(";");
  return commentIndex !== -1 ? line.slice(0, commentIndex) : line;
}
