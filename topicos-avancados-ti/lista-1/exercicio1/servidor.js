var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var servidor = app.listen(8080, function() {
    var porta = servidor.address().port;
    console.log("Servidor executando na porta %s", porta);
});

app.get('/', function(req, res) {
    fs.readFile('html/form-input.html',
        function(erro, resultado) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(resultado);
            res.end();
        });

});

app.post('/media-calculada', urlencodedParser,
    function(req, res) {
        fs.readFile('html/form-output.html',
            function(erro, resultado) {
                resultado = resultado.toString().replace("{{media}}", (parseInt(req.body.numero1) + parseInt(req.body.numero2) + parseInt(req.body.numero3) + parseInt(req.body.numero4)) / 4);
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(resultado);
                res.end();
            });
    });