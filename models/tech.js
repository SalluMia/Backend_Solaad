const mongoose = require('mongoose');

const technologySchema = mongoose.Schema(
  {
    techName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    // imagePublicId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
