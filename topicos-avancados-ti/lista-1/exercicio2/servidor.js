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
                "valorUnProduto": "",
                "quantidadeProduto": "",
                "valorDescontoProduto": "",
                "valorTotal": "",
                "valorTotalComDesconto": ""
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
                var valorUnProduto = parseInt(req.body.valorUnProduto);
                var quantidadeProduto = parseInt(req.body.quantidadeProduto);
                var valorDescontoProduto = parseInt(req.body.valorDescontoProduto) / 100;
                var valorTotal = valorUnProduto * quantidadeProduto;
                var valorTotalComDesconto = valorTotal * (1 - valorDescontoProduto);

                var dados = {
                    "valorUnProduto": valorUnProduto,
                    "quantidadeProduto": quantidadeProduto,
                    "valorDescontoProduto": valorDescontoProduto * 100,
                    "valorTotal": valorTotal,
                    "valorTotalComDesconto": valorTotalComDesconto
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