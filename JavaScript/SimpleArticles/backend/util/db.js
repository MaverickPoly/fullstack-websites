const mongoose = require("mongoose");

const connectDB = async (db_uri) => {
  try {
    await mongoose.connect(db_uri);

    console.log("Database connected!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = { connectDB };
