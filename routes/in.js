var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

router.get('/', function(req, res, next) {
    var xmlfile = __dirname + "/../public/xmlfiles/booksxml.xml";
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            parser.parseString(text, function (err, result) {
                var books = result['bookstore']['book'];
                res.render('in.pug', { books:  books });
            });
        }
   });
});
router.get('/mcq', function(req, res, next) {
    var xmlfile = __dirname + "/../public/xmlfiles/mcq.xml";
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            parser.parseString(text, function (err, result) {
                var mcqs = result['quiz']['items']['item'];
                res.render('mcq.pug', { mcqs:  mcqs });
            });
        }
   });
});

module.exports = router;