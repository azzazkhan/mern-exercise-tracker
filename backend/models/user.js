const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema(
    {
      username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 15,
      },
    },
    {
      timestamps: true,
    },
  ),
);

module.exports = User;
