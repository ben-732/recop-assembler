/**
 * Instruction format:
 *
 *
 * `| AM(2) | OP(6) | Rz(4) | Rx(4) | ADDR/VAL/OTHERs(16) |`
 */
export class Instruction {
  public readonly error = false;
  constructor(private value: number = 0) {}

  toHexString(pretty = true): string {
    const str = this.value.toString(16).padStart(2, "0");

    if (!pretty) {
      return str;
    }

    const bytes = str.match(/.{1,2}/g) || [];
    return bytes.map((byte) => byte.padStart(2, "0")).join(" ");
  }

  toBinaryString(pretty = true): string {
    const str = this.value.toString(2).padStart(32, "0");

    if (!pretty) {
      return str;
    }

    const bytes = str.match(/.{1,8}/g) || [];
    return bytes.map((byte) => byte.padStart(8, "0")).join(" ");
  }

  setPart(partKey: InstructionPartKey, value: number): void {
    const part = InstructionParts[partKey];

    if (!part) {
      throw new Error(`Invalid instruction part: ${partKey}`);
    }

    const mask = makeMask(part);
    const shiftedValue = (value << part.shift) >>> 0;
    const masked = (shiftedValue & mask) >>> 0;

    this.value = (masked | this.value) >>> 0;
  }
}

function makeMask(instruction: InstructionPart): number {
  return (
    (((((1 << instruction.size) >>> 0) - 1) >>> 0) << instruction.shift) >>> 0
  );
}

export interface InstructionPart {
  readonly shift: number;
  readonly size: number;
}

export enum InstructionPartKey {
  AddressMode = "AM",
  OpCode = "OP",
  RegisterZ = "Rz",
  RegisterX = "Rx",
  Operand = "Other",
}

export const InstructionParts: Record<string, InstructionPart> = {
  /** Address Mode */
  [InstructionPartKey.AddressMode]: {
    size: 2,
    shift: 30,
  },
  /** OpCode */
  [InstructionPartKey.OpCode]: {
    size: 6,
    shift: 24,
  },
  /** Register Z */
  [InstructionPartKey.RegisterZ]: {
    size: 4,
    shift: 20,
  },
  /** Register X */
  [InstructionPartKey.RegisterX]: {
    size: 4,
    shift: 16,
  },
  /** Address/Value/Other */
  [InstructionPartKey.Operand]: {
    size: 16,
    shift: 0,
  },
};

export function shift(part: InstructionPart, value: number): number {
  return value << part.shift;
}
