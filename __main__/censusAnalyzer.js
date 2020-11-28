const { rejects } = require('assert');
const { error } = require('console');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const writeFileToJson = require('../__main__/writeFileToJson');

class CensusAnalyzer {
    constructor() {
    }

    loadIndiaStateCensusCSV(filePath) {
        let indiaStateCensusData = [];
        return new Promise((resolve, rejects) => {
            if(!this.checkFileType(filePath)) {
                rejects(new Error('Invalid File Type'));
            }
            else {
                fs.createReadStream(filePath)
                    .on('error', err => {
                        rejects(new Error('No Such File'))
                    })
                    .pipe(csv())
                    .on('headers', (header) => {
                        if(header[0] != 'State' || header[1] != 'Population' || 
                            header[2] != 'AreaInSqKm' || header[3] != 'DensityPerSqKm') {
                                rejects(new Error('Invalid Header'));
                        }
                    })
                    .on('data', (data) => {
                        if(data.State == '' || data.Population == '' || 
                            data.AreaInSqKm == '' || data.DensityPerSqKm == '') {
                                rejects(new Error('Invalid Delimiter'));
                        }
                        else {
                            indiaStateCensusData.push(data);
                        }
                    })
                    .on('end', () => {
                        resolve(indiaStateCensusData);
                    });
                
            }
        })      
    }

    loadIndiaStateCodeCSV(filePath) {
        let indiaStateCodeData = [];
        return new Promise((resolve, rejects) => {
            if(!this.checkFileType(filePath)) {
                rejects(new Error('Invalid File Type'));
            }
            else {
                fs.createReadStream(filePath)
                    .on('error', err => {
                        rejects(new Error('No Such File'))
                    })
                    .pipe(csv())
                    .on('headers', (header) => {
                        if(header[0] != 'SrNo' || header[1] != 'StateName' || 
                            header[2] != 'TIN' || header[3] != 'StateCode') {
                                rejects(new Error('Invalid Header'));
                        }
                    })
                    .on('data', (data) => {
                        if(data.SrNo == '' || data.StateName == '' || 
                            data.TIN == '' || data.StateCode == '') {
                                rejects(new Error('Invalid Delimiter'));
                        }
                        else {
                            indiaStateCodeData.push(data);
                        }
                    })
                    .on('end', () => {
                        resolve(indiaStateCodeData);
                    });
                
            }
        })      

    }

    checkFileType(filePath) {
        var ext = path.extname(filePath);
        return ext == ".csv";
    }

    sortByState(filePath) {
        return new Promise((resolve, rejects) => {
            this.loadIndiaStateCensusCSV(filePath)
                .then(data => {
                    data.sort((data1, data2) => (data1.State < data2.State) ? -1 : 1)
                    writeFileToJson(data);
                    resolve(data)
                })
        })
    }
    
 }

module.exports = CensusAnalyzer;