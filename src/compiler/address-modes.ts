export enum AddressMode {
  /** Inherent (operations on register content) */
  Inherent,
  /** Immediate (value a part of instruction) */
  Immediate,
  /** Direct (Memory address a part of instruction) */
  Direct,
  /** Register indirect (Memory address held in working registers) */
  Register,
}

export const AddressModes: Record<AddressMode, number> = {
  [AddressMode.Inherent]: 0b00,
  [AddressMode.Immediate]: 0b01,
  [AddressMode.Direct]: 0b10,
  [AddressMode.Register]: 0b11,
};
