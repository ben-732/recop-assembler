import { AddressMode, AddressModes } from "./address-modes";
import { InstructionPartKey } from "./instruction";
import { ArgumentType, Command } from "./opcodes";

export type AsmLinePart = "Register" | "Command" | "Number" | "Address";

export type LinePart = {
  type: AsmLinePart;
  regex: RegExp;
  raw: string;
  value: string;
};

const parts = [
  {
    type: "Register",
    regex: /^R([0-9]+)$/,
  },
  {
    type: "Command",
    regex: /^([A-Za-z]+)$/,
  },
  {
    type: "Number",
    regex: /^#([\dA-F]+)$/,
  },
  {
    type: "Address",
    regex: /^\$([\dA-F]+)$/,
  },
] satisfies Pick<LinePart, "regex" | "type">[];

export class AssemblyLine {
  public parts: LinePart[] = [];

  constructor(public raw: string) {
    const line = this.removeComment(raw).trim();

    if (line.length === 0) {
      return;
    }

    const tokens = line
      .split(/\s+/)
      .map((token) => token.trim())
      .map((token) => token.toUpperCase());

    this.parts = tokens.map((token) => {
      const part = parts.find((part) => part.regex.test(token));
      if (part) {
        return {
          type: part.type,
          regex: part.regex,
          raw: token,
          value: token.replace(part.regex, "$1"),
        };
      } else {
        throw new Error(`Invalid token: ${token}`);
      }
    });
  }

  private removeComment(line: string): string {
    const commentIndex = line.indexOf(";");
    return commentIndex !== -1 ? line.slice(0, commentIndex) : line;
  }

  public getCommand(): string {
    if (this.parts.length === 0 || this.parts[0].type !== "Command") {
      throw new Error("No command found in the line.");
    }

    return this.parts[0].value;
  }

  public getArgs() {
    return this.parts.slice(1);
  }

  public parseArguments(
    command: Command
  ): Partial<Record<InstructionPartKey, number>> {
    const result: Partial<Record<InstructionPartKey, number>> = {};

    const am = this.matchMode(command);

    result[InstructionPartKey.AddressMode] = AddressModes[am];

    const args = this.getArgs();
    const currentArgs = command.modes[am];

    if (!currentArgs) {
      throw new Error(
        `Invalid address mode (${am}) for command ${this.getCommand()}`
      );
    }

    if (args.length !== currentArgs.length) {
      throw new Error(
        `Invalid number of arguments for command ${this.getCommand()}`
      );
    }

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const argType = currentArgs[i];

      if (!argType.startsWith(arg.type)) {
        throw new Error(
          `Invalid argument type for command ${this.getCommand()}: expected ${argType}, got ${
            arg.type
          }`
        );
      }

      const parsed = parseInt(arg.value, 16);

      if (isNaN(parsed)) {
        throw new Error(
          `Invalid argument value for command ${this.getCommand()}, got ${
            arg.value
          }`
        );
      }

      if (arg.type === "Register") {
        if (parsed > 7 || parsed < 0) {
          throw new Error(
            `Invalid register value for command ${this.getCommand()}, got ${
              arg.value
            }`
          );
        }
      }

      if (
        (arg.type === "Number" || arg.type === "Address") &&
        parsed > 0xffff
      ) {
        throw new Error(
          `Invalid number value for command ${this.getCommand()}, got ${
            arg.value
          }`
        );
      }

      // Check that register values are consistent
      if (
        argType === "RegisterX" &&
        result[InstructionPartKey.RegisterX] !== undefined
      ) {
        if (result[InstructionPartKey.RegisterX] !== parsed) {
          throw new Error(
            `Inconsistent RegisterX values: ${
              result[InstructionPartKey.RegisterX]
            }, ${parsed}`
          );
        }
      } else if (
        argType === "RegisterZ" &&
        result[InstructionPartKey.RegisterZ] !== undefined
      ) {
        if (result[InstructionPartKey.RegisterZ] !== parsed) {
          throw new Error(
            `Inconsistent RegisterZ values: ${
              result[InstructionPartKey.RegisterZ]
            }, ${parsed}`
          );
        }
      }

      switch (argType) {
        case "RegisterX":
          result[InstructionPartKey.RegisterX] = parsed;
          break;
        case "RegisterZ":
          result[InstructionPartKey.RegisterZ] = parsed;
          break;
        case "Number":
          result[InstructionPartKey.Operand] = parsed;
          break;
        case "Address":
          result[InstructionPartKey.Operand] = parsed;
          break;
        default:
          throw new Error(`Unknown argument type: ${arg.type}`);
      }
    }

    return result;
  }

  private matchMode(command: Command): AddressMode {
    let mode: AddressMode | undefined = undefined;

    for (const key in command.modes) {
      const typedKey = key as unknown as AddressMode;

      if (!command.modes[typedKey]) {
        continue;
      }

      if (this.argumentsMatch(command.modes[typedKey])) {
        mode = typedKey;
        break;
      }
    }

    if (!mode) {
      throw new Error(`Invalid arguments for command ${this.getCommand()}`);
    }

    return mode;
  }

  /**
   * Determines if the arguments of the line match the given parts.
   */
  private argumentsMatch(parts: ArgumentType[]): boolean {
    const [, ...args] = this.parts;

    if (args.length !== parts.length) {
      return false;
    }

    return args.every((arg, index) => {
      const part = parts[index];
      return part.startsWith(arg.type);
    });
  }
}
