"use strict";

const chai = require("chai");
const Netcdf = require("../src/netcdf");
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

const testFile = "../../nc-data/access-s.nc";

describe("Netcdf tests", function () {
  it("new creates new object", function () {
    return expect(new Netcdf(testFile)).to.be.an.instanceof(Netcdf);
  });
  it("new without file throws error", function () {
    return expect(function () {
      new Netcdf();
    }).to.throw(Error);
  });
  it("Test open on existing Netcdf file", async function () {
    let nc = new Netcdf(testFile);
    return expect(nc.open()).to.eventually.equal(true);
  });
  it("Test open on non-existing file", async function () {
    let nc = new Netcdf("notexist.nc");
    return expect(nc.open()).be.rejectedWith(
      /ENOENT: no such file or directory/
    );
  });
  it("Testing close", async function () {
    let nc = new Netcdf(testFile);
    await nc.open();
    nc.close();
    return expect(nc.nc).to.equal(undefined);
  });
});
