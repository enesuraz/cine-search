const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

const MONGO_SERVER = process.env.MONGO_SERVER;
const PORT = process.env.PORT;

mongoose.connect(MONGO_SERVER).then(() => console.log("connection opened"));

app.listen(PORT, () => {
  console.log(`Server listening.... on ${PORT}`);
});
