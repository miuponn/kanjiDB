const Kanji = require('../models/Kanji');

// get all kanji (paginated)
exports.getAllKanji = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const kanjiList = await Kanji.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ strokes: 1 });

        res.status(200).json({
            total: await Kanji.countDocuments(),
            page,
            limit,
            results: kanjiList
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching kanji', error });
    }
};

// get a single kanji by character
exports.getKanjiByChar = async (req, res) => {
    try {
        const kanji = await Kanji.findOne({ character: req.params.character });
        if (!kanji) return res.status(404).json({ message: 'Kanji not found' });

        res.status(200).json(kanji);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving kanji', error });
    }
};

// search kanji by meaning, reading, grade, or JLPT level
exports.searchKanji = async (req, res) => {
    try {
        const { meaning, reading, grade, jlpt } = req.query;
        let filter = {};

        if (meaning) filter.meanings = { $regex: meaning, $options: 'i' };
        if (reading) filter.$or = [
            { readings_on: { $regex: reading, $options: 'i' } },
            { readings_kun: { $regex: reading, $options: 'i' } }
        ];
        if (grade) filter.grade = Number(grade);
        if (jlpt) filter.$or = [{ jlpt_old: Number(jlpt) }, { jlpt_new: Number(jlpt) }];

        const results = await Kanji.find(filter);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching kanji', error });
    }
};

// add a new kanji
exports.createKanji = async (req, res) => {
    try {
        const newKanji = new Kanji(req.body);
        await newKanji.save();
        res.status(201).json(newKanji);
    } catch (error) {
        res.status(400).json({ message: 'Error adding kanji', error });
    }
};

// update a kanji
exports.updateKanji = async (req, res) => {
    try {
        const updatedKanji = await Kanji.findOneAndUpdate(
            { character: req.params.character },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedKanji) return res.status(404).json({ message: 'Kanji not found' });

        res.status(200).json(updatedKanji);
    } catch (error) {
        res.status(400).json({ message: 'Error updating kanji', error });
    }
};

// delete a kanji
exports.deleteKanji = async (req, res) => {
    try {
        const deletedKanji = await Kanji.findOneAndDelete({ character: req.params.character });
        if (!deletedKanji) return res.status(404).json({ message: 'Kanji not found' });

        res.status(200).json({ message: 'Kanji deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting kanji', error });
    }
};

// bulk insert kanji from JSON file
exports.bulkInsertKanji = async (req, res) => {
    try {
        const kanjiData = req.body;
        await Kanji.insertMany(kanjiData, { ordered: false });
        res.status(201).json({ message: 'Kanji bulk insert successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error bulk inserting kanji', error });
    }
};
