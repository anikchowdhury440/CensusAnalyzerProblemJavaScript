
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const writeFileToJson = require('../__main__/writeFileToJson');
const CensusAnalyzerException = require('../__main__/censusAnalyzerException');
const exceptionType = require('../__main__/exceptionType');

class CensusAnalyzer {
    constructor() {
    }

    loadIndiaStateCensusCSV(filePath) {
        let indiaStateCensusData = [];
        return new Promise((resolve, rejects) => {
            if(!this.checkFileType(filePath)) {
                rejects(new CensusAnalyzerException("Invalid File Type", exceptionType.INVALID_FILE_TYPE));
            }
            else {
                fs.createReadStream(filePath)
                    .on('error', err => {
                        rejects(new CensusAnalyzerException('No Such File', exceptionType.INVALID_FILE));
                    })
                    .pipe(csv())
                    .on('headers', (header) => {
                        if(header[0] != 'State' || header[1] != 'Population' || 
                            header[2] != 'AreaInSqKm' || header[3] != 'DensityPerSqKm') {
                                rejects(new CensusAnalyzerException('Invalid Header', exceptionType.INVALID_HEADER));
                        }
                    })
                    .on('data', (data) => {
                        if(data.State == '' || data.Population == '' || 
                            data.AreaInSqKm == '' || data.DensityPerSqKm == '') {
                                rejects(new CensusAnalyzerException('Invalid Delimiter', exceptionType.INVALID_DELIMITER));
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
                rejects(new CensusAnalyzerException("Invalid File Type", exceptionType.INVALID_FILE_TYPE));
            }
            else {
                fs.createReadStream(filePath)
                    .on('error', err => {
                        rejects(new CensusAnalyzerException('No Such File', exceptionType.INVALID_FILE))
                    })
                    .pipe(csv())
                    .on('headers', (header) => {
                        if(header[0] != 'SrNo' || header[1] != 'StateName' || 
                            header[2] != 'TIN' || header[3] != 'StateCode') {
                                rejects(new CensusAnalyzerException('Invalid Header', exceptionType.INVALID_HEADER));
                        }
                    })
                    .on('data', (data) => {
                        if(data.SrNo == '' || data.StateName == '' || 
                            data.TIN == '' || data.StateCode == '') {
                                rejects(new CensusAnalyzerException('Invalid Delimiter', exceptionType.INVALID_DELIMITER));
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

    sortByState(data) {
        return new Promise((resolve) => {
            data.sort((data1, data2) => (data1.State < data2.State) ? -1 : 1)
            writeFileToJson(data);
            resolve(data)
        })
    }

    sortByStateCode(data) {
        return new Promise((resolve) => {
            data.sort((data1, data2) => (data1.StateCode < data2.StateCode) ? -1 : 1)
            writeFileToJson(data);
            resolve(data);
        })
    }

    sortByPopulation(data) {
        return new Promise((resolve) => {
            data.sort((data1, data2) => (parseInt(data1.Population) > parseInt(data2.Population)) ? -1 : 1)
            writeFileToJson(data);
            resolve(data);
        })
    }

    sortByPopulationDensity(data) {
        return new Promise((resolve) => {
            data.sort((data1, data2) => (parseInt(data1.DensityPerSqKm) > parseInt(data2.DensityPerSqKm)) ? -1 : 1)
            writeFileToJson(data);
            resolve(data);
        })
    }

    sortByArea(data) {
        return new Promise((resolve) => {
            data.sort((data1, data2) => (parseInt(data1.AreaInSqKm) > parseInt(data2.AreaInSqKm)) ? -1 : 1)
            writeFileToJson(data);
            resolve(data)
        })
    }
 }

module.exports = CensusAnalyzer;