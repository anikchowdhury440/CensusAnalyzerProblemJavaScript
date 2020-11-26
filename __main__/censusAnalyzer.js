const { rejects } = require('assert');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');

let censusData = []
class CensusAnalyzer {
    constructor(filePath) {
        this.filePath = filePath;
    }

    loadStateCensusCSV() {
        return new Promise((resolve, rejects) => {
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                    censusData.push(data);
                })
                .on('end', () => {
                    resolve(censusData.length);
                });
        })
    }
}

module.exports = CensusAnalyzer;