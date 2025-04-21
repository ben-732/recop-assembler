import { Instruction, InstructionPartKey } from "./instruction";
import { AssemblyLine } from "./assembly-line";
import { parseCommand } from "./opcodes";

type Line = { value: string; line: number };
type LineError = { error: true; message: string };
type InstructionOrError = (Instruction & { error: false }) | LineError;
export type Compiled = { line: number; output: InstructionOrError };

export function compile(input: string): Compiled[] {
  const lines = input
    .split("\n")
    .map<Line>((line, i) => ({
      error: false,
      line: i + 1,
      value: line.trim(),
    }))
    .filter((line) => line.value && line.value.length > 0);

  const instructions: Compiled[] = [];

  for (const line of lines) {
    try {
      const asmLine = new AssemblyLine(line.value);
      // console.log(getOpCode(parts[0].toUpperCase()));

      const command = parseCommand(asmLine.getCommand());

      const instruction = new Instruction(command.value);

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
        line: line.line,
        output: instruction,
      });
    } catch (error) {
      instructions.push({
        line: line.line,
        output: { error: true, message: `${error}`.replace("\n", " ") },
      });
      continue;
    }
  }

  return instructions;
}
