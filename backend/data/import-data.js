const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const Film = require("../model/filmModel");

const MONGO_SERVER = process.env.MONGO_SERVER;

mongoose.connect(MONGO_SERVER).then(() => console.log("connection opened"));

const filmsData = JSON.parse(fs.readFileSync(`${__dirname}/films-data.json`));
const filteredFilmsData = filmsData.filter((film) => film.poster);

async function importData() {
  try {
    await Film.create(filteredFilmsData);
    console.log("imported data successfully!!!");
  } catch (err) {
    console.log(err);
  }

  process.exit(1);
}

async function deleteData() {
  try {
    await Film.deleteMany();
    console.log("delete data successfully!!!");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
}

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
