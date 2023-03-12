enum AddressModes {
  IMPLIED = 0,
  INDIRECT_X = 1,
  ZERO_PAGE = 2,
}
//prettier-ignore
const instructions = {
  0x00: { name: "BRK", addressMode: AddressModes.IMPLIED, size: 1, cycles: 7 },
  0x01: { name: "ORA", addressMode: AddressModes.INDIRECT_X, size: 2, cycles: 6 },
  0x05: { name: "ORA", addressMode: AddressModes.ZERO_PAGE, size: 2, cycles: 3 },
  0x06: { name: "ASL", addressMode: AddressModes.ZERO_PAGE, size: 2, cycles: 5 },
};

export default instructions;
