const mongoose = require("mongoose");

const logoSchema = mongoose.Schema(
  {
    logopic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo;
