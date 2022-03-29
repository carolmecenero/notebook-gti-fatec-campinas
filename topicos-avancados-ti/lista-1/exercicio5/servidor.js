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
            var face = 0,
                faceDado1 = 0,
                faceDado2 = 0,
                faceDado3 = 0,
                faceDado4 = 0,
                faceDado5 = 0,
                faceDado6 = 0,
                totalLancamentos = 50;

            for (var i = 0; i < totalLancamentos; i++) {
                face = Math.floor(Math.random() * 6 + 1);

                switch (face) {
                    case 1:
                        faceDado1++;
                        break;
                    case 2:
                        faceDado2++;
                        break;
                    case 3:
                        faceDado3++;
                        break;
                    case 4:
                        faceDado4++;
                        break;
                    case 5:
                        faceDado5++;
                        break;
                    case 6:
                        faceDado6++;
                }
            }

            var dados = {
                "faceDado1": faceDado1,
                "faceDado2": faceDado2,
                "faceDado3": faceDado3,
                "faceDado4": faceDado4,
                "faceDado5": faceDado5,
                "faceDado6": faceDado6,
                "totalLancamentos": totalLancamentos
            }

            for (var chave in dados) {
                resultado = resultado.toString().replace("{{" + chave + "}}", dados[chave]);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(resultado);
            res.end();
        });
});