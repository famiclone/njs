import Memory from "./memory";

const PRG_ROM_START = 0x0010;

function readString(data: DataView, offset: number, length: number) {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(data.getUint8(offset + i));
  }
  return str.replace(/\u0000/g, "");
}

export default class CPU {
  registers: {
    a: number;
    x: number;
    y: number;
    pc: number;
    sp: number;
    ps: number;
  };
  memory: Memory = new Memory();

  constructor() {
    this.registers = {
      a: 0,
      x: 0,
      y: 0,
      pc: 0,
      sp: 0xFD,
      ps: 0b00100000,
    };
  }

  step() {
    const opcode = this.memory.u8(this.registers.pc);
  }

  loadNSF(buffer: ArrayBuffer) {
    const view = new DataView(buffer);

    const header = {
      version: view.getUint8(0x05),
      totalSongs: view.getUint8(0x06),
      startingSong: view.getUint8(0x07),
      loadAddress: view.getUint16(0x08, true),
      initAddress: view.getUint16(0x0a, true),
      playAddress: view.getUint16(0x0c, true),
      songName: readString(view, 0x0e, 32),
      artistName: readString(view, 0x2e, 32),
      copyrightHolder: readString(view, 0x4e, 32),
      playSpeedNTSC: view.getUint16(0x6e, true),
      bankSwitchInitValues: [],
      playSpeedPAL: view.getUint16(0x78, true),
      palNtsc: view.getUint8(0x7a),
      extraSoundChipSupport: view.getUint8(0x7b),
      nsf2Reserved: view.getUint8(0x7c),
      programDataLength: view.getUint16(0x7d, true),
    };

    this.registers.a = header.startingSong;
    this.registers.x = header.palNtsc;

    const data = new Uint8Array(buffer, 0x80);

    return { header, data };
  }

  load(data: ArrayBuffer) {
    const view = new DataView(data);

    const header = {
      // Identification String. Must be "NES<EOF>".
      idString:
        String.fromCharCode(view.getUint8(0)) +
        String.fromCharCode(view.getUint8(1)) +
        String.fromCharCode(view.getUint8(2)) +
        String.fromCharCode(view.getUint8(3)), // \u001a - EOF

      // size of PRG-ROM in 16 KB units (LSB)
      prgRomSize: view.getUint8(4),

      // size of CHR-ROM in 8 KB units (LSB) (Value 0 means the board uses CHR-RAM)
      chrRomSize: view.getUint8(5),
      flags: {
        /*
        Flags 6
        D~7654 3210
        ---------
        NNNN FTBM
        |||| |||+-- Hard-wired nametable mirroring type
        |||| |||     0: Horizontal or mapper-controlled
        |||| |||     1: Vertical
        |||| ||+--- "Battery" and other non-volatile memory
        |||| ||      0: Not present
        |||| ||      1: Present
        |||| |+--- 512-byte Trainer
        |||| |      0: Not present
        |||| |      1: Present between Header and PRG-ROM data
        |||| +---- Hard-wired four-screen mode
        ||||        0: No
        ||||        1: Yes
        ++++------ Mapper Number D0..D3

        */
        mirroring: view.getUint8(6) & 0b00000001,
        battery: view.getUint8(6) & 0b00000010,
        trainer: view.getUint8(6) & 0b00000100,
        fourScreen: view.getUint8(6) & 0b00001000,
        mapper:
          (view.getUint8(6) & 0b11110000) | (view.getUint8(7) & 0b11110000),

        /**
        Flags 7
        D~7654 3210
         ---------
         NNNN 10TT
         |||| ||++- Console type
         |||| ||     0: Nintendo Entertainment System/Family Computer
         |||| ||     1: Nintendo Vs. System
         |||| ||     2: Nintendo Playchoice 10
         |||| ||     3: Extended Console Type
         |||| ++--- NES 2.0 identifier
         ++++------ Mapper Number D4..D7
         */

        consoleType: view.getUint8(7) & 0b00000011,
        nes2: view.getUint8(7) & 0b00001100,
        mapper2: view.getUint8(7) & 0b11110000,
      },

      // Mapper MSB/Submapper
      /*
      Mapper MSB/Submapper
      D~7654 3210
        ---------
        SSSS NNNN
        |||| ++++- Mapper number D8..D11
        ++++------ Submapper number
      */
      mapper: {
        number: view.getUint8(8) & 0b00001111,
        submapper: view.getUint8(8) & 0b11110000,
      },

      /*
      PRG-ROM/CHR-ROM size MSB
       D~7654 3210
         ---------
         CCCC PPPP
         |||| ++++- PRG-ROM size MSB
         ++++------ CHR-ROM size MSB
      */
      prgRomSizeMSB: view.getUint8(9) & 0b00001111,
      chrRomSizeMSB: view.getUint8(9) & 0b11110000,
    };

    console.log(header);

    //const prgRom = new Uint8Array(data, 16, header.prgRomSize * 16384);
    //const chrRom = new Uint8Array(
    //  data,
    //  16 + prgRom.byteLength,
    //  header.chrRomSize * 8192
    //);

    //console.log({ prgRom, chrRom });
  }
}
