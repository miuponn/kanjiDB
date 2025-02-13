const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Kanji = require('../src/models/Kanji.js');

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(' Error connecting to MongoDB:', err));

const seedDatabase = async () => {
  try {
    // read and parse JSON
    const jsonPath = path.join(__dirname, '../data/kanji.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8'); // read
    const kanjiData = JSON.parse(rawData); // parse

    // convert JSON object to array of objects
    const kanjiArray = Object.entries(kanjiData).map(([character, data]) => ({
      character,
      strokes: data.strokes,
      grade: data.grade,
      frequency: data.freq,
      jlpt_old: data.jlpt_old,
      jlpt_new: data.jlpt_new,
      meanings: data.meanings,
      readings_on: data.readings_on,
      readings_kun: data.readings_kun,
      wk_level: data.wk_level,
      wk_meanings: data.wk_meanings,
      wk_readings_on: data.wk_readings_on,
      wk_readings_kun: data.wk_readings_kun,
      wk_radicals: data.wk_radicals,
    }));

    console.log('Kanji Model:', Kanji); // ✅ Debugging log

    // insert into mongoDB
    try {
      await Kanji.deleteMany({}); // Clear existing data
      await Kanji.insertMany(kanjiArray);
      console.log('✅ Database populated successfully!');
      mongoose.connection.close();
    } catch (error) {
      console.error('❌ Error populating database:', error);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
