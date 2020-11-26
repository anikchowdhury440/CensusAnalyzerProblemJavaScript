const { rejects } = require('assert');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
//const INDIA_STATE_CENSUS_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.csv";

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

// const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_CSV);
// censusAnalyzer.loadStateCensusCSV();

module.exports = CensusAnalyzer;