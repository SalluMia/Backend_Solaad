const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const adminSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "staff"],
      default:"admin"
    },
   
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },

    cpassword: {
      type: String,
      required: [true, "Please confirm your password"],
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  this.cpassword = await bcryptjs.hash(this.cpassword, salt);
  next();
});

adminSchema.methods.matchPasswords = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

adminSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

adminSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 60 * (60 * 1000);
  return resetToken;
};

const admin = mongoose.model("Reg&Login", adminSchema);

module.exports = admin;