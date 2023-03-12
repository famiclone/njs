import NES from "./nes";

const nes =  new NES();

//const inputFile = document.createElement("input");
//inputFile.type = "file";
//
//document.body.appendChild(inputFile);
//
//async function readFile(file: File) {
//  const reader = new FileReader();
//
//  return new Promise((resolve, reject) => {
//    reader.onload = () => {
//      resolve(reader.result);
//    };
//
//    reader.onerror = () => {
//      reject(reader.error);
//    };
//
//    reader.readAsArrayBuffer(file);
//  });
//}

//fetch("./assets/bt.nsf").then((response) => {
//  response.arrayBuffer().then((result) => {
//    const { header, data } = cpu.loadNSF(result as ArrayBuffer);
//
//    console.log(header);
//
//    apu.play(data, 1);
//  });
//});

//inputFile.addEventListener("change", async (event) => {
//  const files = (event.target as HTMLInputElement).files;
//  const extention = files![0].name.split(".").pop();
//
//  if (files) {
//    readFile(files[0]).then((result) => {
//      if (extention === "nsf") {
//        const { header, data } = cpu.loadNSF(result as ArrayBuffer);
//      } else if (extention === "nes") {
//        cpu.load(result as ArrayBuffer);
//      }
//      //cpu.run();
//    });
//  }
//});
