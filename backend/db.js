const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/mernapp";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Fetch GoFood data
    const fetch_data = await mongoose.connection.db.collection("GoFood").find({}).toArray();
    global.GoFood = fetch_data;

    // Fetch samplefood data
    const foodcategory = await mongoose.connection.db.collection("samplefood").find({}).toArray();
    global.samplefood = foodcategory;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = mongoDB;
