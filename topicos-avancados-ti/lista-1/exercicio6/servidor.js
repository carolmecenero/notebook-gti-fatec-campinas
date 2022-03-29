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
                quantidadeCara = 0,
                quantidadeCoroa = 0,
                totalLancamentos = 200;

            for (var i = 0; i < totalLancamentos; i++) {
                face = Math.floor(Math.random() * 2 + 1);

                switch (face) {
                    case 1:
                        quantidadeCara++;
                        break;
                    case 2:
                        quantidadeCoroa++;
                        break;
                }
            }

            var dados = {
                "quantidadeCara": quantidadeCara,
                "quantidadeCoroa": quantidadeCoroa,
                "totalLancamentos": totalLancamentos,
            }

            for (var chave in dados) {
                resultado = resultado.toString().replace("{{" + chave + "}}", dados[chave]);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(resultado);
            res.end();
        });
});