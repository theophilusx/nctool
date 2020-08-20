"use strict";

const Netcdf = require("./netcdf.js");
const minimist = require("minimist");

const usage = `
Usage: node ./index.js -v <var name> -t <value | slice> -s <spec> -f <file path>

where
  -v Name of variable to query
  -t Type of query, vale = read value, slice = read slice of values
  -s spec. A comma separated list of numbers
  -f path to NetCDF input file
`;

const doError = (msg) => {
  console.log(msg);
  console.log(usage);
  exit(-1);
};

const parseArgs = () => {
  const argv = minimist(process.argv.slice(2));
  let args = {};

  if (!argv.f) {
    doError("Error: Must provide a -f <filename> argument");
  } else {
    args.inFile = argv.f;
  }

  if (!argv.v) {
    doError("Error: Must provide a -v <var name> argument");
  } else {
    args.varName = argv.v;
  }

  if (argv.t !== "value" && argv.t !== "slice") {
    doError("Error: The -t argument must be either value or slice");
  } else {
    args.type = argv.t;
  }

  if (!argv.s) {
    doError("Error: Must provide a -s spec argument");
  } else {
    args.spec = argv.s.split(",").map((s) => parseInt(s));
  }
  return args;
};

const main = async () => {
  let nc;

  try {
    let args = parseArgs();
    nc = new Netcdf(args.inFile);
    await nc.open();
    if (args.type === "value") {
      let rslt = nc.read(args.varName, args.spec);
      console.log(rslt);
    } else {
      let rslt = nc.readSlice(args.varName, args.spec);
      console.log(rslt);
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    nc.close();
  }
};

main();
