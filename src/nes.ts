import CPU from "./cpu";
import Memory from "./memory";
import Bus from "./bus";

export default class NES {
  cpu: CPU = new CPU();
  bus: Bus = new Bus();
  memory: Memory = new Memory();
}
