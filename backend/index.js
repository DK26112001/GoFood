const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./db');
const cors = require("cors")

// app.use(cors({
//   origin: true,
//   methods: ["GET","POST","PUT","DELETE"],
//   credentials: true
// }))

(async () => {
  await mongoDB();  // Ensure the database connection and data fetching
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(express.json());
  app.use('/api', require("./Routes/Createusers"));
  app.use('/api', require("./Routes/DisplayData"));
  app.use('/api', require("./Routes/OrderData"));

  app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
  });
})();
