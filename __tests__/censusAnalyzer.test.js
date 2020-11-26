const CensusAnalyzer = require('../__main__/censusAnalyzer');
const INDIA_STATE_CENSUS_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.csv";
const INDIA_STATE_CENSUS_TXT = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.txt";
const WRONG_FILE = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCData.csv";
const INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusDataWrongDelimiter.csv";
const INDIA_STATE_CODE_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCode.csv";
const INDIA_STATE_CODE_TXT = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCode.txt";
const INDIA_STATE_CODE_WRONG_DELIMITER_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCodeWrongDelimiter.csv";


describe('testsForLoadIndiaStateCensusCSV', () => {
    test('givenIndiaStateCensusFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_CSV);
        return expect(censusAnalyzer.loadIndiaStateCensusCSV()).resolves.toBe(29);
    });
    
    test('givenIndiaStateCensusFileIfIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(WRONG_FILE);
        return expect(censusAnalyzer.loadIndiaStateCensusCSV()).rejects.toThrow('No Such File');
    });
    
    test('givenIndiaStateCensusFileIfCorrect_ButTypeIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_TXT);
        return expect(censusAnalyzer.loadIndiaStateCensusCSV()).rejects.toThrow('Invalid File Type');
    });
    
    test('givenIndiaStateCensusFileIfCorrect_ButDelimitterIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_WRONG_DELIMITER_CSV);
        return expect(censusAnalyzer.loadIndiaStateCensusCSV()).rejects.toThrow('Invalid Delimiter');
    });

    test('givenIndiaStateCensusFileIfCorrect_ButHeaderIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CODE_CSV);
        return expect(censusAnalyzer.loadIndiaStateCensusCSV()).rejects.toThrow('Invalid Header');
    });
});

describe('testsForLoadIndiaStateCodeCSV', () => {
    test('givenIndiaStateCodeFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CODE_CSV);
        return expect(censusAnalyzer.loadIndiaStateCodeCSV()).resolves.toBe(37);
    });
    
    test('givenIndiaStateCodeFileIfIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(WRONG_FILE);
        return expect(censusAnalyzer.loadIndiaStateCodeCSV()).rejects.toThrow('No Such File');
    });
    
    test('givenIndiaStateCodeFileIfCorrect_ButTypeIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CODE_TXT);
        return expect(censusAnalyzer.loadIndiaStateCodeCSV()).rejects.toThrow('Invalid File Type');
    });
    
    test('givenStateCodeFileIfCorrect_ButDelimitterIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CODE_WRONG_DELIMITER_CSV);
        return expect(censusAnalyzer.loadIndiaStateCodeCSV()).rejects.toThrow('Invalid Delimiter');
    });

    test('givenStateCodeFileIfCorrect_ButHeaderIncorrect_ShouldThrowException', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_CSV);
        return expect(censusAnalyzer.loadIndiaStateCodeCSV()).rejects.toThrow('Invalid Header');
    });
});