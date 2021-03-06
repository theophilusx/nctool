"use strict";

const fs = require("fs");
const netcdf4 = require("netcdf4");

const exists = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error("No NetCDF input file specified"));
    } else {
      fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    }
  });
};

class Netcdf {
  constructor(ncFile) {
    if (!ncFile) {
      throw new Error("Netcdf requires a NetCDF file argument");
    }
    this.file = ncFile;
    this.nc = undefined;
  }

  close() {
    try {
      if (this.nc) {
        this.nc.close();
        this.nc = undefined;
      }
    } catch (err) {
      throw err;
    }
  }

  async open() {
    try {
      await exists(this.file);
      if (this.nc) {
        this.close();
      }
      this.nc = new netcdf4.File(this.file, "r");
      return true;
    } catch (err) {
      throw err;
    }
  }

  variables() {
    try {
      if (!this.nc) {
        throw new Error("NetCDF file not open");
      }
      return this.nc.root.variables;
    } catch (err) {
      throw err;
    }
  }

  variable(varName) {
    try {
      if (!this.nc) {
        throw new Error("NetCDF file not open");
      }
      return this.nc.root.variables[varName];
    } catch (err) {
      throw err;
    }
  }

  read(varName, position) {
    try {
      if (!this.nc) {
        throw new Error("NetCDF file not open");
      }
      let v = this.nc.root.variables[varName];
      if (!v) {
        throw new Error(`No variable called ${varName} found`);
      }
      return v.read(...position);
    } catch (err) {
      throw err;
    }
  }

  readSlice(varName, sliceSpec) {
    try {
      if (!this.nc) {
        throw new Error("NetCDF file not open");
      }
      let v = this.nc.root.variables[varName];
      if (!v) {
        throw new Error(`No variable called ${varName} found`);
      }
      return v.readSlice(...sliceSpec);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Netcdf;
