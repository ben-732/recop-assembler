import { AddressMode } from "./address-modes";
import { InstructionParts, shift } from "./instruction";

const opcode = InstructionParts.OP;

export interface OpCode {
  value: number;
  modes: AddressMode[];
}

/**
 * Get the opcode for a given instruction. If the instruction is not found, return undefined.
 */
export function getOpCode(value: string) {
  const opcode = opcodes[value.toUpperCase()];
  if (!opcode) {
    return undefined;
  }

  return opcode;
}

function shiftCode(value: number) {
  return shift(opcode, value);
}

export const opcodes: Record<string, OpCode> = {
  /**
   * LDR - Load Register
   * - intermediate: `LDR Rz #value`
   * - indirect: `LDR Rz $address`
   * - direct: `LDR Rz Rx`
   */
  ["LDR"]: {
    value: shiftCode(0b000000),
    modes: [AddressMode.Immediate, AddressMode.Register, AddressMode.Direct],
  },

  /**
   * STR - Store Register
   * - immediate: `STR Rz #value`
   * - indirect: `STR Rz Rx`
   * - direct: `STR Rx Op`
   */
  ["STR"]: {
    value: shiftCode(0b000010),
    modes: [AddressMode.Immediate, AddressMode.Register, AddressMode.Direct],
  },

  /**
   * JMP - Jump
   * - immediate: `JMP #address`
   * - direct: `JMP Rx`
   */
  ["JMP"]: {
    value: shiftCode(0b011000),
    modes: [AddressMode.Immediate, AddressMode.Direct],
  },

  /**
   * PRESENT - Jump to address location if the thread pointed to by Rz is not present else continue execution
   * - direct: `PRESENT Rz Rx`
   */
  ["PRESENT"]: {
    value: shiftCode(0b011100),
    modes: [AddressMode.Direct],
  },

  /**
   * AND - Logical AND
   * - direct: `AND Rz Rx Op`
   */
  ["AND"]: {
    value: shiftCode(0b001000),
    modes: [AddressMode.Direct],
  },

  /**
   * OR - Logical OR
   * - direct: `OR Rz Rx Op`
   */
  ["OR"]: {
    value: shiftCode(0b001100),
    modes: [AddressMode.Direct],
  },

  /**
   * ADD - Addition
   * - direct: `ADD Rz Rx Op`
   */
  ["ADD"]: {
    value: shiftCode(0b111000),
    modes: [AddressMode.Direct],
  },

  /**
   * SUB - Subtraction
   * - direct: `SUB Rz Op`
   */
  ["SUB"]: {
    value: shiftCode(0b000100),
    modes: [AddressMode.Direct],
  },

  /**
   * SUBV - Subtraction with Overflow
   * - direct: `SUBV Rz Rx Op`
   */
  ["SUBV"]: {
    value: shiftCode(0b000011),
    modes: [AddressMode.Direct],
  },

  /**
   * CLFZ - Clear Flags
   * - inherent: `CLFZ`
   */
  ["CLFZ"]: {
    value: shiftCode(0b010000),
    modes: [AddressMode.Inherent],
  },

  /**
   * CER - Clear Error
   * - inherent: `CER`
   */
  ["CER"]: {
    value: shiftCode(0b111100),
    modes: [AddressMode.Inherent],
  },

  /**
   * CEOT - Clear End of Transmission
   * - inherent: `CEOT`
   */
  ["CEOT"]: {
    value: shiftCode(0b111110),
    modes: [AddressMode.Inherent],
  },

  /**
   * SEOT - Set End of Transmission
   * - inherent: `SEOT`
   */
  ["SEOT"]: {
    value: shiftCode(0b111111),
    modes: [AddressMode.Inherent],
  },

  /**
   * NOOP - No Operation
   * - inherent: `NOOP`
   */
  ["NOOP"]: {
    value: shiftCode(0b110100),
    modes: [AddressMode.Inherent],
  },

  /**
   * SZ - Set Zero
   * - immediate: `SZ Op`
   */
  ["SZ"]: {
    value: shiftCode(0b010100),
    modes: [AddressMode.Immediate],
  },

  /**
   * LER - Load Error Register
   * - direct: `LER Rz`
   */
  ["LER"]: {
    value: shiftCode(0b110110),
    modes: [AddressMode.Direct],
  },

  /**
   * SSVOP - Set Special Value Operation
   * - direct: `SSVOP Rx`
   */
  ["SSVOP"]: {
    value: shiftCode(0b111011),
    modes: [AddressMode.Direct],
  },

  /**
   * SSOP - Set Special Operation
   * - direct: `SSOP Rx`
   */
  ["SSOP"]: {
    value: shiftCode(0b111010),
    modes: [AddressMode.Direct],
  },

  /**
   * LSIP - Load Special Instruction Pointer
   * - direct: `LSIP Rx`
   */
  ["LSIP"]: {
    value: shiftCode(0b110111),
    modes: [AddressMode.Direct],
  },

  /**
   * DATACALL - Data Call
   * - register: `DATACALL Rx`
   * - immediate: `DATACALL Rx #value`
   */
  ["DATACALL"]: {
    value: shiftCode(0b101000),
    modes: [AddressMode.Register, AddressMode.Immediate],
  },

  /**
   * DATACALL2 - Data Call Variant
   * - register: `DATACALL2 Rx`
   * - immediate: `DATACALL2 Rx #value`
   */
  ["DATACALL2"]: {
    value: shiftCode(0b101001),
    modes: [AddressMode.Register, AddressMode.Immediate],
  },

  /**
   * MAX - Maximum
   * - immediate: `MAX Rz #value`
   */
  ["MAX"]: {
    value: shiftCode(0b011110),
    modes: [AddressMode.Immediate],
  },

  /**
   * STRPC - Store Program Counter
   * - direct: `STRPC Rz $address`
   */
  ["STRPC"]: {
    value: shiftCode(0b011101),
    modes: [AddressMode.Direct],
  },

  /**
   * SRES - Set Reset
   * - register: `SRES Rz`
   */
  ["SRES"]: {
    value: shiftCode(0b101010),
    modes: [AddressMode.Register],
  },
};
