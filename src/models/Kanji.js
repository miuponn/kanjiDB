const mongoose = require('mongoose');

const KanjiSchema = new mongoose.Schema({
  character: { type: String, required: true, unique: true },
    strokes: { type: Number, required: true },
    grade: { type: Number, required: false },
    freq: { type: Number, required: false },
    jlpt_old: { type: Number, required: false },
    jlpt_new: { type: Number, required: false },
    meanings: { type: [String], required: true },
    readings_on: { type: [String], required: false },
    readings_kun: { type: [String], required: false },
    wk_level: { type: Number, required: false },
    wk_meanings: { type: [String], required: false },
    wk_readings_on: { type: [String], required: false },
    wk_readings_kun: { type: [String], required: false },
    wk_radicals: { type: [String], required: false }
}, { timestamps: true });

const Kanji = mongoose.model('Kanji', KanjiSchema);

module.exports = Kanji;
