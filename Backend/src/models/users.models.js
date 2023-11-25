const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    password: String,
    image: String,
    accessToken: String,
    accessTokenCreatedAt: String,
    userCreatedAt: String,
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", userSchema);
