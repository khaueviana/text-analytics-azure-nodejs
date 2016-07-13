var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

var mobile = require('./mobile');
var table = require('./config').tables.postsSentiment;
var getLanguage = require('./lib/sentiment/getLanguage');
var getSentiment = require('./lib/sentiment/getSentiment');

var port = process.env.PORT || 5002;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mobile.tables.initialize();

app.use(mobile);

router.route('/')
    .post(function (req, res) {
        var params = req.body.documents;
        getLanguage(params, function (dataLanguage) {
            getSentiment(params, dataLanguage, function (dataSentiment) {
                dataSentiment.documents.forEach(function (entry) {
                    var item = {
                        id: entry.id,
                        score: entry.score
                    };
                    req.azureMobile
                        .tables(table)
                        .insert(item);
                });
                res.status(200).send({});
            });
        });
    });

app.use('/api/sentiment', router);

app.listen(port);