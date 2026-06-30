document.addEventListener("DOMContentLoaded", () => {
  const campoValor = document.getElementById("valor");
  const btnGerar   = document.getElementById("btnGerar");
  const btnCopiar  = document.getElementById("btnCopiar");
  const btnPDF     = document.getElementById("btnPDF");
  const btnLimpar  = document.getElementById("btnLimpar");

  /* ===================== EVENTOS ===================== */
  btnGerar.addEventListener("click", gerarBoletim);
  btnCopiar.addEventListener("click", copiarTexto);
  btnPDF.addEventListener("click", baixarPDF);
  btnLimpar.addEventListener("click", limparFormulario);

  /* ===================== MÁSCARA DE VALOR ===================== */
  campoValor.addEventListener("input", function () {
    let apenasDigitos = this.value.replace(/\D/g, "");

    if (apenasDigitos === "") {
      this.value = "";
      return;
    }

    let numero = (parseInt(apenasDigitos, 10) / 100).toFixed(2);
    let [inteiro, decimal] = numero.split(".");
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.value = "R$ " + inteiro + "," + decimal;
  });
});

/* ===================== GERAR BOLETIM ===================== */
async function gerarBoletim(event) {
  if (event) event.preventDefault();

  const nome      = document.getElementById("nome");
  const data      = document.getElementById("data");
  const tipoGolpe = document.getElementById("tipoGolpe");
  const valor     = document.getElementById("valor");
  const descricao = document.getElementById("descricao");

  /* Limpa marcações de erro anteriores */
  [nome, data, tipoGolpe, valor, descricao].forEach(c => c.classList.remove("campo-erro"));

  /* Valida cada campo individualmente */
  let valido = true;
  if (!nome.value.trim())          { nome.classList.add("campo-erro");      valido = false; }
  if (!data.value)                 { data.classList.add("campo-erro");      valido = false; }
  if (!tipoGolpe.value)            { tipoGolpe.classList.add("campo-erro"); valido = false; }
  if (!valor.value.trim())         { valor.classList.add("campo-erro");     valido = false; }
  if (!descricao.value.trim())     { descricao.classList.add("campo-erro"); valido = false; }

  if (!valido) {
    alert("Por favor, preencha todos os campos destacados em vermelho.");
    return;
  }

  /* Feedback visual no botão enquanto gera */
  const btnGerar = document.getElementById("btnGerar");
  btnGerar.disabled = true;
  btnGerar.innerHTML = '<i class="bi bi-hourglass-split"></i> Gerando...';

  const dataFormatada = data.value.split("-").reverse().join("/");

  const texto =
`Eu, ${nome.value.trim()}, venho por meio deste registrar um boletim de ocorrência referente a um golpe sofrido no dia ${dataFormatada}.

Tipo do golpe: ${tipoGolpe.value}

Valor do prejuízo: ${valor.value.trim()}

Descrição dos fatos:
${descricao.value.trim()}

Solicito que as medidas cabíveis sejam tomadas pelas autoridades competentes.`;

  /* MOSTRAR TEXTO */
  document.getElementById("textoBoletim").textContent = texto;

  /* Esconde instrução inicial e mostra botões e link da delegacia */
  const instrucao = document.getElementById("instrucaoResultado");
  if (instrucao) instrucao.style.display = "none";

  document.getElementById("botoesResultado").style.display = "flex";
  document.getElementById("btnDelegacia").style.display    = "flex";

  /* SALVAR NO JSON SERVER */
  try {
    await fetch("http://localhost:4000/boletins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome:      nome.value.trim(),
        data:      data.value,
        tipoGolpe: tipoGolpe.value,
        valor:     valor.value.trim(),
        descricao: descricao.value.trim(),
        texto
      })
    });
  } catch (erro) {
    console.log("JSON Server não disponível:", erro.message);
  }

  /* Restaura o botão */
  btnGerar.disabled = false;
  btnGerar.innerHTML = '<i class="bi bi-pencil-square"></i> Gerar Boletim';
}

/* ===================== COPIAR TEXTO ===================== */
function copiarTexto() {
  const texto = document.getElementById("textoBoletim").textContent;

  if (!texto.trim()) {
    alert("Gere um boletim primeiro!");
    return;
  }

  navigator.clipboard.writeText(texto)
    .then(() => {
      const btn = document.getElementById("btnCopiar");
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiado!';
      btn.style.backgroundColor = "#1e8a3e";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.backgroundColor = "";
      }, 2500);
    })
    .catch(() => alert("Erro ao copiar o texto. Tente selecionar e copiar manualmente."));
}

/* ===================== BAIXAR PDF ===================== */
function baixarPDF() {
  const texto = document.getElementById("textoBoletim").textContent;

  if (!texto.trim()) {
    alert("Gere um boletim antes!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(21, 101, 169);
  doc.text("Boletim de Ocorrência — SeniorShield", 10, 15);

  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);

  const linhas = doc.splitTextToSize(texto, 180);
  doc.text(linhas, 10, 30);

  doc.save("boletim_SeniorShield.pdf");
}

/* ===================== LIMPAR FORMULÁRIO ===================== */
function limparFormulario() {
  const confirmado = confirm(
    "Tem certeza que deseja limpar todos os campos?\nOs dados preenchidos serão apagados."
  );
  if (!confirmado) return;

  /* Limpa os valores dos campos trazendo para o estado original do HTML */
  document.getElementById("nome").value      = "";
  document.getElementById("data").value      = "";
  document.getElementById("tipoGolpe").value = ""; /* Reseta para a opção inicial vazia do HTML */
  document.getElementById("valor").value     = "";
  document.getElementById("descricao").value = "";

  /* Remove marcações de erro, se houver */
  ["nome", "data", "tipoGolpe", "valor", "descricao"].forEach(id => {
    document.getElementById(id).classList.remove("campo-erro");
  });

  /* Limpa o texto gerado e esconde os botões do resultado */
  document.getElementById("textoBoletim").textContent = "";
  document.getElementById("botoesResultado").style.display = "none";
  document.getElementById("btnDelegacia").style.display    = "none";

  /* Restaura a instrução inicial na área de resultado */
  const instrucao = document.getElementById("instrucaoResultado");
  if (instrucao) instrucao.style.display = "";

  /* Foca no primeiro campo */
  document.getElementById("nome").focus();
}