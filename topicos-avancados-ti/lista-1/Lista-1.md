## Exercícios
1. Desenvolver uma aplicação Internet em Node.js que receba quatro números reais digitados pelo usuárioatravés de um formulário HTML e, em seguida, calcule e exiba a valor da média dos números em uma nova página HTML.

2. Desenvolver uma aplicação web em Node.js para uma determinada loja que precisa calcular o preço de venda de um produto. O cálculo deverá ser efetuado através da multiplicação do preço unitário pela quantidade vendida e, posteriormente, subtrair o valor do desconto. Considerar todas as variáveis do tipo de dado real, que serão digitadas pelo usuário através de um formulário HTML.

3. Considerando o desenvolvimento de uma aplicação Node.js para a Internet e sendo que a Lei de Ohm define que a resistência (R) de um condutor é obtida através da divisão da tensão aplicada (V) dividida pela intensidade de corrente elétrica (A). Desta forma, a partir de uma tensão e corrente, digitadas pelo usuário através de um formulário HTML, calcule e mostre o valor da resistência.

4. Desenvolver um servidor, usando Node.js, que apresente uma página HTML contendo a data e hora atuais.

5. Desenvolver um servidor, usando Node.js, que simule um uma página HTML um dado de jogo sendo lançado leatoriamente por 50 vezes. A mesma página deverá exibir quantas vezes cada uma das faces foi sorteada.

6. Desenvolver um servidor, usando Node.js, que simule um uma página HTML uma moeda sendo lançada leatoriamente por 200 vezes. A mesma página deverá exibir a porcentagem de caras e coroas que foram sorteadas.

7. Considerando que a aprovação de um aluno em determinada disciplina requer uma média final maior ou igual a 6,0 (seis). Elaborar uma aplicação Node.js para a web que receba através de um formulário HTML, duas notas, realize o cálculo da média, exiba o valor calculado e uma imagem indicando se o aluno está aprovado ou reprovado.

8. Realizar o desenvolvimento de um servidor Node.js que disponibilize uma página HTML que irá receber as informações através de um formulário e realizar a validação dos dados digitados, considerando que uma seguradora de veículos precisa calcular o valor da apólice com base nas seguintes informações: nome, sexo e ano de nascimento do segurado, marca, modelo, ano de fabricação, valor do veículo e porcentagem do bônus. As seguintes validações deverão ser realizadas na própria página HTML que contém o formulário:
   1. O campo sexo deverá aceitar apenas F (Feminino) ou M (Masculino).
   2. O campo ano de nascimento deve aceitar um valor entre 2001 e 1901.
   3. O campo ano de fabricação deverá ser um valor inteiro positivo.
   4. O campo valor do veículo deve ser um número real positivo.
   5. O campo porcentagem do bônus deverá ser um número real entre 0 e 25.
   6. Quando o formulário for submetido o servidor deverá determinar o valor da apólice, a partir dos seguintes critérios para cálculo: 
        1. Critério A: Para veículos 2010 ou mais recentes o valor da apólice é de 1,25% do valor do veículo veículos entre 2009 e 2000 o valor da apólice é de 1,75% do valor do veículo, veículos entre 1999 e 1980 o valor da apólice é de 2,00% e para os demais anos de fabricação devemos utilizar 2,50% como base de cálculo. 
        2. Critério B: Caso o segurado seja do sexo feminino aplicar um desconto 10% sobre o valor calculado no item 1, caso contrário, acrescer 5% ao valor calculado no item 1.
        3. Critério C: Se o segurado possuir menos de 30 anos ou mais de 60 anos, acrescentar 20% ao valor da apólice após os cálculos realizados no item a e no item 2.
        4. A partir do valor apurado nos itens a, b e c aplicar o desconto com base na porcentagem de bônus informada pelo usuário.