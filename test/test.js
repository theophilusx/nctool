"use strict";

const chai = require("chai");
const Netcdf = require("../src/netcdf");
const chaiAsPromised = require("chai-as-promised");
const utils = require("../src/utils.js");

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

describe("Test reading values", function () {
  let nc;
  let v1, v2, v3, v4, v5, v6, v7, v8, a1;

  before("Setup", async function () {
    nc = new Netcdf(testFile);
    await nc.open();
  });

  after("Cleanup", function () {
    nc.close();
  });

  it("Test v1", function () {
    v1 = nc.read("tasmax", [0, 300, 400]);
    return expect(v1).to.equal(23.84000015258789);
  });
  it("Test v2", function () {
    v2 = nc.read("tasmax", [0, 300, 401]);
    return expect(v2).to.equal(23.899999618530273);
  });
  it("Test v3", function () {
    v3 = nc.read("tasmax", [0, 301, 400]);
    return expect(v3).to.equal(24);
  });
  it("Test v4", function () {
    v4 = nc.read("tasmax", [0, 301, 401]);
    return expect(v4).to.equal(24);
  });
  it("Test v5", function () {
    v5 = nc.read("tasmax", [1, 300, 400]);
    return expect(v5).to.equal(24.940000534057617);
  });
  it("Test v6", function () {
    v6 = nc.read("tasmax", [1, 300, 401]);
    return expect(v6).to.equal(24.959999084472656);
  });
  it("test v7", function () {
    v7 = nc.read("tasmax", [1, 301, 400]);
    return expect(v7).to.equal(25.040000915527344);
  });
  it("Test v8", function () {
    v8 = nc.read("tasmax", [1, 301, 401]);
    return expect(v8).to.equal(25.010000228881836);
  });
  it("test readSlice 1", function () {
    a1 = nc.readSlice("tasmax", [0, 2, 300, 2, 400, 2]);
    return expect(a1.length).to.equal(8);
  });
gg  it("Test readslice value 1", function () {
    return expect();
  });
});
