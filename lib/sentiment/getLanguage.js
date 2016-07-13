var checkStatus = require('../../util/checkStatus');
var parseJson = require('../../util/parseJson');
var fetch = require('node-fetch');

module.exports = function getLanguage(params, callback) {
    var postData = JSON.stringify({ documents: params });
    fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages?numberOfLanguagesToDetect=1', {
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