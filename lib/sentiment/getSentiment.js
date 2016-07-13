var checkStatus = require('../../util/checkStatus');
var parseJson = require('../../util/parseJson');
var fetch = require('node-fetch');

module.exports = function getSentiment(params, dataLanguage, callback) {
    var documents = []
    dataLanguage.documents.forEach(function (entry) {
        var currentItem = params.filter(function (item) {
            return item.id == entry.id;
        });
        documents.push({
            language: entry.detectedLanguages[0].iso6391Name,
            id: entry.id,
            text: currentItem[0].text
        });

    });
    var postData = JSON.stringify({ documents: documents });
    fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'SUBSCRIPTION KEY',
            'Content-Length': Buffer.byteLength(postData)
        },
        body: postData
    })
        .then(checkStatus)
        .then(parseJson)
        .then(function (data) {
            callback(data);
        });
}