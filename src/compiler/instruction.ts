/**
 * Instruction format:
 *
 *
 * `| AM(2) | OP(6) | Rz(4) | Rx(4) | ADDR/VAL/OTHERs(16) |`
 */
export class Instruction extends Number {
  constructor(value: number) {
    super(value);
  }

  toHexString(pretty = true): string {
    const str = this.toString(16).padStart(2, "0");

    if (!pretty) {
      return str;
    }

    const bytes = str.match(/.{1,2}/g) || [];
    return bytes.map((byte) => byte.padStart(2, "0")).join(" ");
  }

  toBinaryString(pretty = true): string {
    const str = this.toString(2).padStart(32, "0");

    if (!pretty) {
      return str;
    }

    const bytes = str.match(/.{1,8}/g) || [];
    return bytes.map((byte) => byte.padStart(8, "0")).join(" ");
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

export const InstructionParts: Record<string, InstructionPart> = {
  /** Address Mode */
  AM: {
    size: 2,
    shift: 30,
    mask: 0b11 << 30,
  },
  /** OpCode */
  OP: {
    size: 6,
    shift: 25,
    mask: 0b111111 << 25,
  },
  /** Register Z */
  Rz: {
    size: 4,
    shift: 21,
    mask: 0b1111 << 21,
  },
  /** Register X */
  Rx: {
    size: 4,
    shift: 17,
    mask: 0b1111 << 17,
  },
  /** Address/Value/Other */
  Other: {
    size: 16,
    shift: 0,
    mask: 0b1111111111111111,
  },
};

export function shift(part: InstructionPart, value: number): number {
  return value << part.shift;
}
