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

    loadIndiaStateCensusCSV() {
        return new Promise((resolve, rejects) => {
            
            if(!fs.existsSync(this.filePath)) {
                rejects(new Error('No Such File'));
            }
            else {
                var ext = path.extname(this.filePath);
                if(ext != '.csv'){
                    rejects(new Error('Invalid File Type'));
                }
                fs.createReadStream(this.filePath)
                    .pipe(csv())
                    .on('headers', (header) => {
                        if(header[0] != 'State' || header[1] != 'Population' || header[2] != 'AreaInSqKm' || header[3] != 'DensityPerSqKm') {
                            rejects(new Error('Invalid Header'));
                        }
                    })
                    .on('data', (data) => {
                        if(data.State == '' || data.Population == '' || data.AreaInSqKm == '' || data.DensityPerSqKm == '') {
                            rejects(new Error('Invalid Delimiter'));
                        }
                        else {
                            censusData.push(data);
                        }
                    })
                    .on('end', () => {
                        resolve(censusData.length);
                    });
            }
        })      
    }

 }

module.exports = CensusAnalyzer;