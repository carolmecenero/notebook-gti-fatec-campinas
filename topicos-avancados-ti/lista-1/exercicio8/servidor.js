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
                "valorNome": "",
                "valorSexo": "",
                "valorAnoNascimento": "",
                "valorMarca": "",
                "valorModelo": "",
                "valorAnoFabricacao": "",
                "valorVeiculo": "",
                "valorBonus": "",
                "valorApolice": "",
                "valorCriterioA": "",
                "valorCriterioB": "",
                "valorCriterioC": ""
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
                var valorNome = req.body.valorNome;
                var valorSexo = req.body.valorSexo;
                var valorAnoNascimento = parseInt(req.body.valorAnoNascimento);
                var valorMarca = req.body.valorMarca;
                var valorModelo = req.body.valorModelo;
                var valorAnoFabricacao = parseInt(req.body.valorAnoFabricacao);
                var valorVeiculo = parseFloat(req.body.valorVeiculo);
                var valorBonus = parseInt(req.body.valorBonus);
                var idade = parseInt(new Date().getFullYear()) - valorAnoNascimento;
                var valorApolice = 0,
                    valorCriterioA = 0,
                    valorCriterioB = 0,
                    valorCriterioC = 0;

                /* critério A:
                 * x >= 2010 -> 1.25%
                 * 2009 >= x >= 2000 -> 1.75%
                 * 1999 >= x >= 1980 -> 2%
                 * x <= 1979 -> 2.5%
                 */
                if (valorAnoFabricacao >= 2010) {
                    valorCriterioA = 1.25;
                } else if (2009 >= valorAnoFabricacao >= 2000) {
                    valorCriterioA = 1.75;
                } else if (1999 >= valorAnoFabricacao >= 1980) {
                    valorCriterioA = 2;
                } else {
                    valorCriterioA = 2.5;
                }

                valorApolice = valorVeiculo * (valorCriterioA / 100);
                console.log("Criterio A - Apolice: ", valorApolice);

                /* critério B:
                 * Caso o segurado seja do sexo feminino aplicar um desconto 10% sobre o valor calculado no item a, 
                 * caso contrário, acrescer 5% ao valor calculado no item a.
                 */
                if (valorSexo == "F") {
                    valorCriterioB = 10;
                    valorApolice = valorApolice * (1 - (valorCriterioB / 100));
                } else {
                    valorCriterioB = 5;
                    valorApolice = valorApolice * (1 + (valorCriterioB / 100));
                }
                console.log("Criterio B - Apolice: ", valorApolice);

                /* critério C:
                 * Se o segurado possuir menos de 30 anos ou mais de 60 anos, acrescentar 20% ao valor da apólice 
                 * após os cálculos realizados no item a e no item b.
                 */
                if (idade < 30 || idade > 60) {
                    valorCriterioC = 20;
                    valorApolice = valorApolice * (1 + (valorCriterioC / 100));
                }
                console.log("Criterio C - Apolice: ", valorApolice);

                valorApolice = valorApolice * (1 - (valorBonus / 100));
                console.log("Apolice: ", valorApolice);

                var dados = {
                    "valorNome": valorNome,
                    "valorSexo": valorSexo,
                    "valorAnoNascimento": valorAnoNascimento,
                    "valorMarca": valorMarca,
                    "valorModelo": valorModelo,
                    "valorAnoFabricacao": valorAnoFabricacao,
                    "valorVeiculo": valorVeiculo,
                    "valorBonus": valorBonus,
                    "valorApolice": valorApolice,
                    "valorCriterioA": valorCriterioA,
                    "valorCriterioB": valorCriterioB,
                    "valorCriterioC": valorCriterioC
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