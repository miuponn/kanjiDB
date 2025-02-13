const fs = require('fs').promises;
const path = require('path');

const KANJI_JSON_PATH = path.join(__dirname, '../../data/kanji.json');

/**
 * Read kanji JSON data from data directory
 * @returns {Promise<Object>}
 */
const fetchKanjiData = async () => {
    try {
        const data = await fs.readFile(KANJI_JSON_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading kanji data:', error);
        throw error;
    }
};

module.exports = { fetchKanjiData };
