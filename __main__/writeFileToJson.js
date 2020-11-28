const fs = require('fs');

const writeFileToJson = data => {
    fs.writeFile ("C:\\Users\\Anik Chowdhury\\Desktop\\JavaScriptProject\\CensusAnalyzerProblem\\__main__\\__resources__\\IndiaStateCensus.json", JSON.stringify(data, null, 2), function(err) {
        if (err) 
            throw err;
        }
    );
}

module.exports = writeFileToJson;