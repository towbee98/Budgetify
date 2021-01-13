const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: [15, "Sorry your firstname must not exceed 15 characters"],
    minlength: [2, "Sorry your firstname must have at least 2 characters"],
    required: [true, "Sorry your firstname cannot be empty"],
  },
  lastName: {
    type: String,
    maxlength: [15, "Sorry your lastname must not exceed 15 characters"],
    minlength: [2, "Sorry your lastname must have at least 2 characters"],
    required: [true, "Sorry your lastname cannot be empty"],
  },
  username: {
    type: String,
    maxlength: [10, "Username cannot exceed 12 characters"],
    minlength: [6, "Username must have at least 6 characters"],
    required: [true, "Username cannot be blank"],
    unique: [true, "Username already exist"],
    validate: [validator.isAlpha, "Username must contain letters"],
  },
  email: {
    type: String,
    required: [true, "Sorry Email cannot be blank"],
    unique: [true, "Email account already exists"],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Sorry Enter a password"],
    maxlength: [12, "password cannot exceed 12 characters"],
    minlength: [8, "Password must have at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Sorry Enter a passwordConfirm"],
    maxlength: [12, "password cannot exceed 12 characters"],
    minlength: [8, "Password must have at least 8 characters"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Sorry the passwordConfirm must match the password ",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordTokenExpiresAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  //Only run this function if password was  modified else move to the next middleware
  if (!this.isModified("password")) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPassword = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = async function () {
  //Creates a reset token for password reset
  const resetToken = crypto.randomBytes(32).toString("hex");
  //Store the encrypted version of the token on the database
  this.passwordResetToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //console.log({ resetToken }, this.passwordResetToken);
  //this ensures the reset token is valid for just 10 minutes
  this.passwordTokenExpiresAt = Date.now() + 10 * 60 * 1000;
  //console.log(this.passwordTokenExpiresAt);
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
