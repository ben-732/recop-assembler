import { Instruction } from "./instruction";
import { getOpCode } from "./opcodes";

export function compile(input: string): Instruction[] {
  console.log(input);

  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line.length > 0);

  const instructions: Instruction[] = [];

  for (const line of lines) {
    const parts = line
      .split(" ")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);

    console.log(getOpCode(parts[0].toUpperCase()));

    const opcode = getOpCode(parts[0].toUpperCase());

    instructions.push(new Instruction(opcode?.value ?? -1));
  }

  return instructions;
}
