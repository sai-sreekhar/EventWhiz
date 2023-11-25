const mongoose = require("mongoose");
let conn = null;

exports.connectToDB = async function (uri) {
  if (conn == null) {
    try {
      conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("New Connection Established to MongoDB");
      return true;
    } catch (error) {
      console.log("Failed to Establish Connection to MongoDB", error);
      return false;
    }
  }

  console.log("Reusing Existing Connection to MongoDB");
  return true;
};

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.DB_CONNECTION, {
//       maxPoolSize: 100,
//       minPoolSize: 2,
//     });
//     console.log("Connected to Database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// };

// module.exports = { connectToDatabase };
