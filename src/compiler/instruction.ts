/**
 * Instruction format:
 *
 *
 * `| AM(2) | OP(6) | Rz(4) | Rx(4) | ADDR/VAL/OTHERs(16) |`
 */
export class Instruction {
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

  getPart(part: InstructionPart): number {
    return (this.value & part.mask) >> part.shift;
  }

  setPart(partKey: InstructionPartKey, value: number): void {
    const part = InstructionParts[partKey];

    if (!part) {
      throw new Error(`Invalid instruction part: ${partKey}`);
    }

    const mask = part.mask;
    const shiftedValue = value << part.shift;

    this.value = ((this.value & ~mask) | shiftedValue) >>> 0;
  }
}

export interface InstructionPart {
  readonly shift: number;
  readonly size: number;

  /**
   * The full 32-bit mask for the instruction part.
   */
  readonly mask: number;
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
    mask: 0b11 << 30,
  },
  /** OpCode */
  [InstructionPartKey.OpCode]: {
    size: 6,
    shift: 25,
    mask: 0b111111 << 25,
  },
  /** Register Z */
  [InstructionPartKey.RegisterZ]: {
    size: 4,
    shift: 20,
    mask: 0b1111 << 20,
  },
  /** Register X */
  [InstructionPartKey.RegisterX]: {
    size: 4,
    shift: 16,
    mask: 0b1111 << 16,
  },
  /** Address/Value/Other */
  [InstructionPartKey.Operand]: {
    size: 16,
    shift: 0,
    mask: 0b1111111111111111,
  },
};

export function shift(part: InstructionPart, value: number): number {
  return value << part.shift;
}
