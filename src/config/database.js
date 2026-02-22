const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://deepakjalmoori_db_user:8V80BCx1LFCyfnHp@ac-eauxzgu-shard-00-00.ps5lmm1.mongodb.net:27017,ac-eauxzgu-shard-00-01.ps5lmm1.mongodb.net:27017,ac-eauxzgu-shard-00-02.ps5lmm1.mongodb.net:27017/devTinder?replicaSet=atlas-8ieajx-shard-0&ssl=true&authSource=admin"
    );
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Failed ❌", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
