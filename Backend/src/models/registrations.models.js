const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: "Registrations" }
);

module.exports = mongoose.model("Registrations", registrationSchema);
