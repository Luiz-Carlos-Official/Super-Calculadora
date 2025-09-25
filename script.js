// script.js

// -------------------- FUNÇÕES AUXILIARES --------------------

// Pega valores dos inputs e converte vírgula para ponto
function getValores() {
    let n1 = parseFloat(document.getElementById("num1").value.replace(",", "."));
    let n2 = parseFloat(document.getElementById("num2").value.replace(",", "."));
    return [n1, n2];
}

// Mostra resultado e adiciona ao histórico
function mostrarResultado(texto, expressao = "") {
    document.getElementById("res").innerText = texto;
    if (expressao !== "") {
        adicionarHistorico(expressao + " = " + texto.replace("Resultado: ", ""));
    }
}

// Adiciona operação ao histórico
function adicionarHistorico(operacao) {
    let historico = document.getElementById("historico");
    let item = document.createElement("li");
    item.innerText = operacao;
    historico.appendChild(item);
}

// Limpa histórico
function limparHistorico() {
    document.getElementById("historico").innerHTML = "";
}

// Copia resultado para a área de transferência
function copiarResultado() {
    let resultado = document.getElementById("res").innerText;
    if (resultado !== "—") {
        navigator.clipboard.writeText(resultado)
            .then(() => alert("Resultado copiado!"))
            .catch(() => alert("Erro ao copiar!"));
    }
}

// Troca valores A ↔ B
function trocar() {
    let inputA = document.getElementById("num1");
    let inputB = document.getElementById("num2");
    let temp = inputA.value;
    inputA.value = inputB.value;
    inputB.value = temp;
}

// -------------------- OPERAÇÕES BÁSICAS --------------------

function somar() {
    let [n1, n2] = getValores();
    mostrarResultado(`Resultado: ${n1 + n2}`, `${n1} + ${n2}`);
}

function subtrair() {
    let [n1, n2] = getValores();
    mostrarResultado(`Resultado: ${n1 - n2}`, `${n1} - ${n2}`);
}

function multiplicar() {
    let [n1, n2] = getValores();
    mostrarResultado(`Resultado: ${n1 * n2}`, `${n1} × ${n2}`);
}

function dividir() {
    let [n1, n2] = getValores();
    if (n2 === 0) {
        mostrarResultado("Erro: divisão por zero!");
    } else {
        mostrarResultado(`Resultado: ${n1 / n2}`, `${n1} ÷ ${n2}`);
    }
}

// -------------------- OPERAÇÕES AVANÇADAS --------------------

function potencia() {
    let [n1, n2] = getValores();
    mostrarResultado(`Resultado: ${Math.pow(n1, n2)}`, `${n1} ^ ${n2}`);
}

function raiz() {
    let [n1] = getValores();
    if (n1 < 0) {
        mostrarResultado("Erro: número negativo não tem raiz real!");
    } else {
        mostrarResultado(`Resultado: ${Math.sqrt(n1)}`, `√${n1}`);
    }
}

function fatorial() {
    let [n1] = getValores();
    if (!Number.isInteger(n1) || n1 < 0) {
        mostrarResultado("Erro: fatorial apenas para inteiros ≥ 0");
        return;
    }
    let fat = 1;
    for (let i = 1; i <= n1; i++) fat *= i;
    mostrarResultado(`Resultado: ${fat}`, `${n1}!`);
}

function porcentagem() {
    let [n1, n2] = getValores();
    mostrarResultado(`Resultado: ${(n1 / 100) * n2}`, `${n1}% de ${n2}`);
}

// -------------------- MDC E MMC --------------------

function mdc() {
    let [a, b] = getValores();
    a = Math.floor(a);
    b = Math.floor(b);
    if (a === 0 || b === 0) {
        mostrarResultado("Erro: MDC com zero indefinido");
        return;
    }
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    mostrarResultado(`Resultado: ${Math.abs(a)}`, `MDC(${a},${b})`);
}

function mmc() {
    let [a, b] = getValores();
    a = Math.floor(a);
    b = Math.floor(b);
    if (a === 0 || b === 0) {
        mostrarResultado("Erro: MMC com zero indefinido");
        return;
    }
    let resultado = Math.abs(a * b) / gcd(a, b);
    mostrarResultado(`Resultado: ${resultado}`, `MMC(${a},${b})`);
}

// função auxiliar para MMC
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

// -------------------- FATORAÇÃO EM PRIMOS --------------------

function fatorarPrimos() {
    let [n1] = getValores();
    n1 = Math.floor(n1);
    if (n1 < 2) {
        mostrarResultado("Erro: número deve ser ≥ 2 para fatoração");
        return;
    }
    let num = n1;
    let fatores = [];
    for (let i = 2; i <= num; i++) {
        while (num % i === 0) {
            fatores.push(i);
            num /= i;
        }
    }
    mostrarResultado(`Resultado: ${fatores.join(" × ")}`, `Fatoração(${n1})`);
}
