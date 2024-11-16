const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, 
    });
    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

module.exports = connectToDatabase;
