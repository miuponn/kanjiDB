const express = require('express');
const kanjiController = require('../../controllers/kanji.controller');

const router = express.Router();

/**
 * @route   GET /api/kanji
 * @desc    Get all kanji (paginated)
 * @query   page, limit, sort
 */
router.get('/', kanjiController.getAllKanji);

/**
 * @route   GET /api/kanji/:character
 * @desc    Get a single kanji by character
 */
router.get('/:character', kanjiController.getKanjiByChar);

/**
 * @route   GET /api/kanji/search
 * @desc    Search kanji by meaning, readings, grade, JLPT, or strokes
 * @query   meaning, reading, grade, jlpt, strokes
 */
router.get('/search', kanjiController.searchKanji);

/**
 * @route   POST /api/kanji
 * @desc    Add a new kanji entry
 */
router.post('/', kanjiController.createKanji);

/**
 * @route   PUT /api/kanji/:character
 * @desc    Update kanji by character
 */
router.put('/:character', kanjiController.updateKanji);

/**
 * @route   DELETE /api/kanji/:character
 * @desc    Delete a kanji entry
 */
router.delete('/:character', kanjiController.deleteKanji);

/**
 * @route   POST /api/kanji/bulk
 * @desc    Bulk insert kanji data (for importing JSON)
 */
router.post('/bulk', kanjiController.bulkInsertKanji);

module.exports = router;
