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
    fs.readFile('html/form.html',
        function(erro, resultado) {
            var dados = {
                "valorTensao": "",
                "valorCorrenteEletrica": "",
                "valorResistencia": "",
            }
            for (var chave in dados) {
                resultado = resultado.toString().replace("{{" + chave + "}}", dados[chave]);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(resultado);
            res.end();
        });
});

app.post('/', urlencodedParser,
    function(req, res) {
        fs.readFile('html/form.html',
            function(erro, resultado) {
                var valorTensao = parseInt(req.body.valorTensao);
                var valorCorrenteEletrica = parseInt(req.body.valorCorrenteEletrica);
                var valorResistencia = valorTensao / valorCorrenteEletrica;

                var dados = {
                    "valorTensao": valorTensao,
                    "valorCorrenteEletrica": valorCorrenteEletrica,
                    "valorResistencia": valorResistencia,
                }

                for (var chave in dados) {
                    resultado = resultado.toString().replace("{{" + chave + "}}", dados[chave]);
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(resultado);
                res.end();
            });
    });