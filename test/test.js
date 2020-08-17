"use strict";

const chai = require("chai");
const Netcdf = require("../src/netcdf");

const expect = chai.expect;

const testFile = "../../../nc-data/access-s.nc";

describe("Netcdf tests", function () {
  it("new creates new object", function () {
    return expect(new Netcdf(testFile)).to.be.an.instanceof(Netcdf);
  });
  it("new without file throws error", function () {
    return expect(new Netcdf()).to.throw(
      /Error: Netcdf requires a NetCDF file argument/
    );
  });
});
