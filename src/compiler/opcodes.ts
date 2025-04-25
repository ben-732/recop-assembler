import { AddressMode } from "./address-modes";

export type ArgumentType = "RegisterX" | "RegisterZ" | "Number" | "Address";

export interface Command {
  value: number;
  modes: Partial<Record<AddressMode, Array<ArgumentType>>>;
}

/**
 * Get the opcode for a given instruction. If the instruction is not found, return undefined.
 */
export function parseCommand(value: string): Command {
  if (value.length === 0) {
    throw new Error("Empty Command");
  }

  const opcode = commands[value.toUpperCase() as Opcode];
  if (!opcode) {
    throw new Error(`Unknown Command: ${value}`);
  }

  return opcode;
}

export const opcodes = [
  "LDR",
  "STR",
  "JMP",
  "PRESENT",
  "AND",
  "OR",
  "ADD",
  "SUB",
  "SUBV",
  "CLFZ",
  "CER",
  "CEOT",
  "SEOT",
  "NOOP",
  "SZ",
  "LER",
  "SSVOP",
  "SSOP",
  "LSIP",
  "DATACALL",
  "MAX",
  "STRPC",
] as const;
export type Opcode = (typeof opcodes)[number];

export const commands = {
  ["AND"]: {
    value: 0b001000,
    modes: {
      [AddressMode.Register]: ["RegisterZ", "RegisterZ", "RegisterX"],
      [AddressMode.Immediate]: ["RegisterZ", "RegisterX", "Number"],
    },
  },

  ["OR"]: {
    value: 0b001100,
    modes: {
      [AddressMode.Register]: ["RegisterZ", "RegisterZ", "RegisterX"],
      [AddressMode.Immediate]: ["RegisterZ", "RegisterX", "Number"],
    },
  },

  ["ADD"]: {
    value: 0b111000,
    modes: {
      [AddressMode.Register]: ["RegisterZ", "RegisterZ", "RegisterX"],
      [AddressMode.Immediate]: ["RegisterZ", "RegisterX", "Number"],
    },
  },

  ["SUBV"]: {
    value: 0b000011,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "RegisterX", "Number"],
    },
  },

  ["SUB"]: {
    value: 0b000100,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "Number"],
    },
  },

  ["LDR"]: {
    value: 0b000000,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "Number"],
      [AddressMode.Register]: ["RegisterZ", "RegisterX"],
      [AddressMode.Direct]: ["RegisterZ", "Address"],
    },
  },

  ["STR"]: {
    value: 0b000010,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "Number"],
      [AddressMode.Register]: ["RegisterZ", "RegisterX"],
      [AddressMode.Direct]: ["RegisterX", "Address"],
    },
  },

  ["JMP"]: {
    value: 0b011000,
    modes: {
      [AddressMode.Immediate]: ["Number"],
      [AddressMode.Direct]: ["RegisterX"],
    },
  },

  ["PRESENT"]: {
    value: 0b011100,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "Number"],
    },
  },

  ["DATACALL"]: {
    value: 0b101000,
    modes: {
      [AddressMode.Register]: ["RegisterX"],
      [AddressMode.Immediate]: ["RegisterX", "Number"],
    },
  },

  ["SZ"]: {
    value: 0b010100,
    modes: {
      [AddressMode.Immediate]: ["Number"],
    },
  },

  ["CLFZ"]: {
    value: 0b010000,
    modes: {
      [AddressMode.Inherent]: [],
    },
  },

  ["CER"]: {
    value: 0b111100,
    modes: {
      [AddressMode.Inherent]: [],
    },
  },

  ["CEOT"]: {
    value: 0b111110,
    modes: {
      [AddressMode.Inherent]: [],
    },
  },

  ["SEOT"]: {
    value: 0b111111,
    modes: {
      [AddressMode.Inherent]: [],
    },
  },

  ["LER"]: {
    value: 0b110110,
    modes: {
      [AddressMode.Register]: ["RegisterZ"],
    },
  },

  ["SSVOP"]: {
    value: 0b111011,
    modes: {
      [AddressMode.Register]: ["RegisterX"],
    },
  },

  ["LSIP"]: {
    value: 0b110111,
    modes: {
      [AddressMode.Register]: ["RegisterZ"],
    },
  },

  ["SSOP"]: {
    value: 0b111010,
    modes: {
      [AddressMode.Register]: ["RegisterX"],
    },
  },

  ["NOOP"]: {
    value: 0b110100,
    modes: {
      [AddressMode.Inherent]: [],
    },
  },

  ["MAX"]: {
    value: 0b011110,
    modes: {
      [AddressMode.Immediate]: ["RegisterZ", "Number"],
    },
  },

  ["STRPC"]: {
    value: 0b011101,
    modes: {
      [AddressMode.Direct]: ["Address"], // `$address`
    },
  },
} satisfies Record<Opcode, Command>;
