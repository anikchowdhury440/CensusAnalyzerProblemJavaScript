const { rejects } = require('assert');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

let censusData = []
class CensusAnalyzer {
    constructor(filePath) {
        this.filePath = filePath;
    }

    loadStateCensusCSV() {
        return new Promise((resolve, rejects) => {
            
            if(!fs.existsSync(this.filePath)) {
                rejects(new Error('No Such File'));
            }
            else{
                var ext = path.extname(this.filePath);
                if(ext != '.csv'){
                    rejects(new Error('Invalid File Type'));
                }
                fs.createReadStream(this.filePath)
                    .pipe(csv())
                    .on('data', (data) => {
                        censusData.push(data);
                    })
                    .on('end', () => {
                        resolve(censusData.length);
                    });
            }
        })      
    }
}

module.exports = CensusAnalyzer;