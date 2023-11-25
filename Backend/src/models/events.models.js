const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: String,
    description: String,
    date: String,
    location: String,
    image: String,
    limit: Number,
    price: Number,
    createdAt: String,
  },
  { collection: "Events" }
);

module.exports = mongoose.model("Events", eventSchema);
