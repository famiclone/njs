export default class Memory {
  data: DataView = new DataView(new ArrayBuffer(0x10000));

  u8(address: number): number {
    return this.data.getUint8(address);
  }

  u16(address: number): number {
    return this.data.getUint16(address, true);
  }

  u32(address: number): number {
    return this.data.getUint32(address, true);
  }
}
