const CensusAnalyzer = require('../__main__/censusAnalyzer');
const exceptionType = require('../__main__/exceptionType');
const INDIA_STATE_CENSUS_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.csv";
const INDIA_STATE_CENSUS_TXT = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.txt";
const WRONG_FILE = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCData.csv";
const INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusDataWrongDelimiter.csv";
const INDIA_STATE_CODE_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCode.csv";
const INDIA_STATE_CODE_TXT = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCode.txt";
const INDIA_STATE_CODE_WRONG_DELIMITER_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCodeWrongDelimiter.csv";


describe('testsForLoadIndiaStateCensusCSV', () => {
    test('givenIndiaStateCensusFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_CSV).then(data => expect(data.length).toBe(29));
    });
    
    test('givenIndiaStateCensusFileIfIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCensusCSV(WRONG_FILE).catch(error => expect(error.type).toBe(exceptionType.INVALID_FILE));
    });
    
    test('givenIndiaStateCensusFileIfCorrect_ButTypeIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_TXT).catch(error => expect(error.type).toBe(exceptionType.INVALID_FILE_TYPE))
    });
    
    test('givenIndiaStateCensusFileIfCorrect_ButDelimitterIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV).catch(error => expect(error.type).toBe(exceptionType.INVALID_DELIMITER));
    });

    test('givenIndiaStateCensusFileIfCorrect_ButHeaderIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CODE_CSV).catch(error => expect(error.type).toBe(exceptionType.INVALID_HEADER));
    });
});

describe('testsForLoadIndiaStateCodeCSV', () => {
    test('givenIndiaStateCodeFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCodeCSV(INDIA_STATE_CODE_CSV).then(data => expect(data.length).toBe(37));
    });
    
    test('givenIndiaStateCodeFileIfIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCodeCSV(WRONG_FILE).catch(error => expect(error.type).toBe(exceptionType.INVALID_FILE));
    });
    
    test('givenIndiaStateCodeFileIfCorrect_ButTypeIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCodeCSV(INDIA_STATE_CODE_TXT).catch(error => expect(error.type).toBe(exceptionType.INVALID_FILE_TYPE));
    });
    
    test('givenStateCodeFileIfCorrect_ButDelimitterIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCodeCSV(INDIA_STATE_CODE_WRONG_DELIMITER_CSV).catch(error => expect(error.type).toBe(exceptionType.INVALID_DELIMITER));
    });

    test('givenStateCodeFileIfCorrect_ButHeaderIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer();
        return censusAnalyzer.loadIndiaStateCodeCSV(INDIA_STATE_CENSUS_CSV).catch(error => expect(error.type).toBe(exceptionType.INVALID_HEADER));
    });
});

describe('testForSortStateCensusCSV', () => {
    test('givenStateCensusData_WhenSortedByState_ShouldReportSortedFormat', async () => {
        const censusAnalyzer = new CensusAnalyzer();
        const stateCensusData =  await censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_CSV)
        return censusAnalyzer.sortByState(stateCensusData).then(data => {
            expect(data[0].State).toBe('Andhra Pradesh');
            expect(data[28].State).toBe('West Bengal');
        });
    });

    test('givenStateCodeData_WhenSortedByStateCode_ShouldReportSortedFormat', async () => {
        const censusAnalyzer = new CensusAnalyzer();
        const stateCodeData = await censusAnalyzer.loadIndiaStateCodeCSV(INDIA_STATE_CODE_CSV);
        return censusAnalyzer.sortByStateCode(stateCodeData).then(data => {
            expect(data[0].StateName).toBe('Andhra Pradesh New');
            expect(data[36].StateName).toBe('West Bengal');
        });
    });

    test('givenStateCensusData_WhenSortedByPopulation_ShouldReportSortedFormat', async () => {
        const censusAnalyzer = new CensusAnalyzer();
        const stateCensusData = await censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_CSV);
        return censusAnalyzer.sortByPopulation(stateCensusData).then(data => {
            expect(data[0].State).toBe('Uttar Pradesh');
            expect(data[28].State).toBe('Sikkim');
        });
    });

    test('givenStateCensusData_WhenSortedByPopulationDensity_ShouldReportSortedFormat',  async () => {
        const censusAnalyzer = new CensusAnalyzer();
        const stateCensusData = await censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_CSV);
        return censusAnalyzer.sortByPopulationDensity(stateCensusData).then(data => {
            expect(data[0].State).toBe('Bihar');
            expect(data[28].State).toBe('Arunachal Pradesh');
        });
    });

    test('givenStateCensusData_WhenSortedByArea_ShouldReportSortedFormat', async () => {
        const censusAnalyzer = new CensusAnalyzer();
        const stateCensusData = await censusAnalyzer.loadIndiaStateCensusCSV(INDIA_STATE_CENSUS_CSV);
        return censusAnalyzer.sortByArea(stateCensusData).then(data => {
            expect(data[0].State).toBe('Rajasthan');
            expect(data[28].State).toBe('Goa');
        });
    });
})