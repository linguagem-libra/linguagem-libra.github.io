// Exemplos oficiais da Libra (espelham libra-cs/exemplos/), disponíveis no
// botão "Carregar exemplo" do playground. Cada um traz um stdin sugerido para
// os programas que leem entrada().

export type ExemploLibra = {
  id: string;
  nome: string;
  descricao: string;
  codigo: string;
  stdin?: string;
};

export const EXEMPLOS: ExemploLibra[] = [
  {
    id: 'ola-mundo',
    nome: 'Olá, Mundo!',
    descricao: 'O clássico primeiro programa.',
    codigo: `// O clássico!
exibir("Olá, Mundo!")
`,
  },
  {
    id: 'condicional',
    nome: 'Condicionais',
    descricao: 'se / senao se / senao.',
    codigo: `var x = 8
se x > 10 entao
    exibir("x é maior que 10")
senao se x == 10 entao
    exibir("x é igual a 10")
senao
    exibir("x é menor que 10")
fim
`,
  },
  {
    id: 'fibonacci',
    nome: 'Fibonacci',
    descricao: 'Laços e funções: sequência de Fibonacci.',
    codigo: `// Função para listar a sequência de Fibonacci
funcao fibonacci(n: Int)
    var a = 0
    var b = 1
    var contador = 0
    var temp = 0
    enquanto contador < n repetir
        exibir(a)
        temp = a
        a = b
        b = temp + b
        contador = contador+1
    fim
fim

// Mostra os 10 primeiros números da sequência de Fibonacci
fibonacci(10)
`,
  },
  {
    id: 'calculadora',
    nome: 'Calculadora',
    descricao: 'Lê números e um operador da entrada.',
    codigo: `exibir("Calculadora")
exibir("Primeiro número:", " ")
var x = real(entrada())

exibir("Operador: ", " ")
var operador = entrada()

exibir("Segundo número:", " ")
var y = real(entrada())

funcao calcular(a: Real, b: Real, opr: Texto): Real
    se opr == "+" entao
        retornar a+b
    fim
    se opr == "-" entao
        retornar a-b
    fim
    se opr == "*" entao
        retornar a*b
    fim
    se opr == "/" entao
        se b == 0 entao
            erro("Divisão por zero!")
        fim
        retornar a/b
    fim
    erro("Operador inválido! " + opr)
fim

var resultado = calcular(x, y, operador)
exibir(resultado)
`,
    stdin: `10\n+\n5`,
  },
  {
    id: 'bubble-sort',
    nome: 'Bubble Sort',
    descricao: 'Ordena um vetor usando a biblioteca vetores.',
    codigo: `importar vetores

funcao bubbleSort(vetor: Vetor)
    var i = 0
    enquanto i < tamanho(vetor) repetir
        var j = 0
        enquanto j < tamanho(vetor) - 1 repetir
            se vetor[j] > vetor[j + 1] entao
                var temp = vetor[j]
                vetor[j] = vetor[j + 1]
                vetor[j + 1] = temp
            fim
            j = j + 1
        fim
        i = i + 1
    fim
    exibir("Vetor ordenado: ", "")
    mostrarVetor(vetor)
fim

var numeros = { 64, 34, 25, 12, 22, 11, 90 }
bubbleSort(numeros)
`,
  },
  {
    id: 'busca-binaria',
    nome: 'Busca binária',
    descricao: 'Procura um elemento em um vetor ordenado.',
    codigo: `funcao buscaBinaria(vetor: Vetor, alvo: Int)
    var inicio = 0
    var fimVetor = tamanho(vetor) - 1
    enquanto inicio <= fimVetor repetir
        var meio = int((inicio + fimVetor))
        se vetor[meio] == alvo entao
            exibir(concat("Elemento encontrado na posição: ", meio))
            retornar nulo
        fim
        se vetor[meio] < alvo entao
            inicio = meio + 1
        senao
            fimVetor = meio - 1
        fim
    fim
    exibir("Elemento não encontrado.")
fim

var lista = { 1, 3, 5, 7, 9, 11, 13, 15 }
buscaBinaria(lista, 7)
`,
  },
  {
    id: 'merge-sort',
    nome: 'Merge de vetores',
    descricao: 'Intercala dois vetores ordenados.',
    codigo: `// Algoritmo mergeSort para ordenar dois vetores
funcao mergeSort(primeiro: Vetor, segundo: Vetor)
    var i = 0
    var j = 0
    enquanto (i < tamanho(primeiro)) e (j < tamanho(segundo)) repetir
        se primeiro[i] < segundo[j] entao
            exibir(primeiro[i], " ")
            i = i + 1
        senao
            exibir(segundo[j], " ")
            j = j + 1
        fim
    fim

    enquanto i < tamanho(primeiro) repetir
        exibir(primeiro[i], " ")
        i = i + 1
    fim

    enquanto j < tamanho(segundo) repetir
        exibir(segundo[j], " ")
        j = j + 1
    fim
fim

var x = { 0, 2, 4 }
var y = { 1, 3, 5 }
mergeSort(x, y)
exibir("")
`,
  },
  {
    id: 'jokenpo',
    nome: 'Jokenpô',
    descricao: 'Pedra, papel e tesoura contra o computador.',
    codigo: `importar matematica

funcao jogar()
    var opcoes = { "Pedra", "Papel", "Tesoura" }
    var computador = int(aleatorio(0, 3))

    exibir("Escolha: 0 - Pedra, 1 - Papel, 2 - Tesoura" + NL, "> ")
    var jogador = int(entrada())

    se jogador < 0 ou jogador >= tamanho(opcoes) entao
        exibir("Escolha inválida!")
        retornar nulo
    fim

    exibir(concat("Você escolheu: ", opcoes[jogador]))
    exibir(concat("Computador escolheu: ", opcoes[computador]))

    se jogador == computador entao
        exibir("Empate!")
    senao se (jogador == 0 e computador == 2) ou (jogador == 1 e computador == 0) ou (jogador == 2 e computador == 1) entao
        exibir("Você ganhou!")
    senao
        exibir("Você perdeu!")
    fim
fim

jogar()
`,
    stdin: `0`,
  },
];
