"use strict";

const Netcdf = require("./netcdf.js");
const minimist = require("minimist");

const argv = minimist(process.argv.slice(2));

const vName = argv.v;
const inFile = argv.f;
const readType = argv.t;
const sliceSpec = argv.s;
const readPos = argv.r;

console.log(`Reading variable ${vName} from file ${inFile}`);
if (sliceSpec) {
  console.log(`Reading slice with spec: ${sliceSpec}`);
} else {
  console.log(`Reading value at location ${readPos}`);
}
