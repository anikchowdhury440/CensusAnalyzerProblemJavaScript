const { rejects } = require('assert');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

// let indiaStateCensusData = []
// let indiaStateCodeData = []
class CensusAnalyzer {
    constructor() {
    }

    loadIndiaStateCensusCSV(filePath) {
        return new Promise((resolve, rejects) => {
            let indiaStateCensusData = [];
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
                        resolve(indiaStateCensusData.length);
                    });
                
            }
        })      
    }

    loadIndiaStateCodeCSV(filePath) {
        return new Promise((resolve, rejects) => {
            let indiaStateCodeData = []
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
                        resolve(indiaStateCodeData.length);
                    });
                
            }
        })      

    }

    checkFileType(filePath) {
        var ext = path.extname(filePath);
        return ext == ".csv";
    }
    
 }

module.exports = CensusAnalyzer;