"use strict";

// this needs to be generalised to handle n-dimensional arrays!
const calcOffset = (indicies, dimensions) => {
  let nDims = dimensions.length;

  switch (nDims) {
    case 1:
      return indicies[0];
    case 2:
      return indicies[1] + dimensions[1] * indicies[0];
    case 3:
      return (
        indicies[2] +
        dimensions[2] * (indicies[1] + dimensions[1] * indicies[0])
      );
    default:
      return -1;
  }
};

module.exports = {
  calcOffset,
};
