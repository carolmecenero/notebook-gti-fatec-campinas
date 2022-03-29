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

app.use(express.static('img'));

app.get('/', function(req, res) {
    fs.readFile('html/form.html',
        function(erro, resultado) {
            var dados = {
                "valorNota1": "",
                "valorNota2": "",
                "valorMedia": "",
                "status": "",
                "statusImg": "",
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
                var valorNota1 = parseInt(req.body.valorNota1);
                var valorNota2 = parseInt(req.body.valorNota2);
                var valorMedia = (valorNota1 + valorNota2) / 2;
                var status, statusImg;

                if (valorMedia >= 6) {
                    status = "Aprovado";
                    statusImg = "aprovado.png"
                } else {
                    status = "Reprovado";
                    statusImg = "reprovado.png"
                }

                var dados = {
                    "valorNota1": valorNota1,
                    "valorNota2": valorNota2,
                    "valorMedia": valorMedia,
                    "status": status,
                    "statusImg": statusImg
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