const CensusAnalyzer = require('../__main__/censusAnalyzer');
const INDIA_STATE_CENSUS_CSV = "C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensusData.csv";

describe('testsForLoadIndiaStateCensusCSV', () => {
    test('givenStateCensusFile_EnsureNoOfRecordsMatches', () => {
        const censusAnalyzer = new CensusAnalyzer(INDIA_STATE_CENSUS_CSV);
        return expect(censusAnalyzer.loadStateCensusCSV()).resolves.toBe(29);
    });
});