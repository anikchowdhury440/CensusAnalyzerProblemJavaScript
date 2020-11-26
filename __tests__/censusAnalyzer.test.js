const CensusAnalyzer = require('../__main__/censusAnalyzer');
const INDIA_STATE_CENSUS_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.csv";
const INDIA_STATE_CENSUS_TXT = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.txt";
const WRONG_FILE = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensuData.csv";
const INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusDataWrongDelimiter.csv";
const INDIA_STATE_CODE_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCode.csv"

describe('testsForLoadIndiaStateCensusCSV', () => {
    test('givenStateCensusFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_CSV);
        return expect(censusAnalyzer.loadStateCensusCSV()).resolves.toBe(29);
    });
    
    test('givenStateCensusFileIfIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(WRONG_FILE);
        return expect(censusAnalyzer.loadStateCensusCSV()).rejects.toThrow('No Such File');
    });
    
    test('givenStateCensusFileIfCorrect_ButTypeIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_TXT);
        return expect(censusAnalyzer.loadStateCensusCSV()).rejects.toThrow('Invalid File Type');
    });
    
    test('givenStateCensusFileIfCorrect_ButDelimitterIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV);
        return expect(censusAnalyzer.loadStateCensusCSV()).rejects.toThrow('Invalid Delimiter');
    });

    test('givenStateCensusFileIfCorrect_ButHeaderIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CODE_CSV);
        return expect(censusAnalyzer.loadStateCensusCSV()).rejects.toThrow('Invalid Header');
    });
});