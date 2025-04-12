import { Instruction, InstructionPartKey } from "./instruction";
import { AssemblyLine } from "./assembly-line";
import { parseCommand } from "./opcodes";

export function compile(input: string): Instruction[] {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line.length > 0);

  const instructions: Instruction[] = [];

  for (const line of lines) {
    try {
      const asmLine = new AssemblyLine(line);
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

      instructions.push(instruction);
    } catch (error) {
      console.error(`Error parsing line "${line}": ${error}}`);
      console.log(error);
      continue;
    }
  }

  return instructions;
}
