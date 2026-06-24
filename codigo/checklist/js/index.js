var DADOS = {
  "perguntas": [
    {
      "id": "1",
      "categoria": "Ligação Suspeita",
      "emoji": "📞",
      "texto": "Você recebeu uma ligação de alguém dizendo ser do seu banco pedindo sua senha ou dados do cartão?"
    },
    {
      "id": "2",
      "categoria": "Golpe Financeiro",
      "emoji": "💸",
      "texto": "Alguém pediu que você fizesse uma transferência ou Pix urgente para 'liberar' um benefício ou prêmio?"
    },
    {
      "id": "3",
      "categoria": "Golpe Familiar",
      "emoji": "👨‍👩‍👧",
      "texto": "Você recebeu uma mensagem dizendo que um familiar está em perigo e precisa de dinheiro imediatamente?"
    },
    {
      "id": "4",
      "categoria": "Acesso Remoto",
      "emoji": "📱",
      "texto": "Alguém pediu para você instalar um aplicativo no celular para 'ajudar' ou 'verificar' sua conta?"
    },
    {
      "id": "5",
      "categoria": "Golpe de Prêmio",
      "emoji": "🎁",
      "texto": "Você foi informado que ganhou um prêmio ou sorteio, mas precisa pagar uma taxa para recebê-lo?"
    },
    {
      "id": "6",
      "categoria": "Roubo de Dados",
      "emoji": "🪪",
      "texto": "Alguém pediu seus dados pessoais (CPF, RG, data de nascimento) por telefone ou mensagem sem você ter iniciado o contato?"
    },
    {
      "id": "7",
      "categoria": "Phishing",
      "emoji": "🔗",
      "texto": "Você recebeu um link por WhatsApp ou SMS pedindo para atualizar seus dados bancários ou do INSS?"
    },
    {
      "id": "8",
      "categoria": "Golpe Romântico",
      "emoji": "💌",
      "texto": "Uma pessoa que você conheceu recentemente pela internet pediu dinheiro emprestado ou um favor financeiro?"
    }
  ],
  "recomendacoes": {
    "1": {
      "tipo": "perigo",
      "icone": "🚨",
      "titulo": "Cuidado com ligações do banco",
      "texto": "Bancos nunca pedem senha ou dados do cartão por telefone. Se receber essa ligação, desligue e ligue de volta para o número oficial impresso no seu cartão."
    },
    "2": {
      "tipo": "perigo",
      "icone": "🚫",
      "titulo": "Pix e transferências urgentes são golpe",
      "texto": "Nenhuma empresa legítima pede Pix para liberar benefício ou prêmio. Sinta urgência? Desconfie! Ligue para um familiar antes de qualquer transferência."
    },
    "3": {
      "tipo": "perigo",
      "icone": "👨‍👩‍👧",
      "titulo": "Golpe do familiar em perigo",
      "texto": "Antes de mandar dinheiro, ligue diretamente para o familiar usando o número que você já conhece. Golpistas criam pânico — respire fundo e confirme a situação."
    },
    "4": {
      "tipo": "perigo",
      "icone": "📵",
      "titulo": "Nunca instale aplicativo por pedido de estranhos",
      "texto": "Apps de 'suporte' podem dar controle total do seu celular a golpistas. Peça ajuda apenas a pessoas de confiança ou vá pessoalmente a uma loja autorizada."
    },
    "5": {
      "tipo": "cuidado",
      "icone": "🎭",
      "titulo": "Prêmio verdadeiro não exige pagamento",
      "texto": "Se você ganhou de verdade, não paga nada. Cobrar taxa para receber prêmio é golpe clássico. Pesquise o nome da empresa antes de qualquer ação."
    },
    "6": {
      "tipo": "cuidado",
      "icone": "🛑",
      "titulo": "Proteja seus dados pessoais",
      "texto": "CPF, RG e data de nascimento são dados sensíveis. Nunca os forneça a quem ligou para você. Compartilhe apenas quando você tiver iniciado o contato."
    },
    "7": {
      "tipo": "perigo",
      "icone": "🔗",
      "titulo": "Links suspeitos são armadilhas",
      "texto": "Não clique em links sobre banco ou INSS recebidos por mensagem. Acesse sempre digitando o endereço oficial no navegador. Em dúvida, peça ajuda a alguém de confiança."
    },
    "8": {
      "tipo": "cuidado",
      "icone": "💌",
      "titulo": "Cuidado com amizades virtuais pedindo dinheiro",
      "texto": "Golpistas criam perfis falsos para ganhar confiança e depois pedir dinheiro. Nunca envie valores para pessoas que você só conhece pela internet."
    }
  },
  "dicasGerais": [
    {
      "icone": "📞",
      "titulo": "Número de emergência",
      "texto": "Suspeita de golpe? Ligue para o Procon (151) ou para a Delegacia de Crimes Digitais do seu estado."
    },
    {
      "icone": "👨‍👩‍👦",
      "titulo": "Fale com a família",
      "texto": "Sempre converse com um filho, sobrinho ou amigo de confiança antes de tomar qualquer decisão financeira envolvendo estranhos."
    },
    {
      "icone": "🏦",
      "titulo": "Ligue para seu banco",
      "texto": "Qualquer dúvida sobre sua conta: use o número impresso no verso do seu cartão. Nunca use número enviado por mensagem."
    }
  ]
};

/* ── VARIÁVEIS GLOBAIS ── */
var perguntas     = [];
var recomendacoes = {};
var dicasGerais   = [];
var respostas     = {};

/* ── INICIALIZAÇÃO ── */
window.onload = function () {
  perguntas     = DADOS.perguntas;
  recomendacoes = DADOS.recomendacoes;
  dicasGerais   = DADOS.dicasGerais;

  montarPerguntas();
  carregarDoStorage();
};

/* ── MONTAR PERGUNTAS NO DOM ── */
function montarPerguntas() {
  var lista = document.getElementById('lista-perguntas');
  lista.innerHTML = '';

  for (var i = 0; i < perguntas.length; i++) {
    var p    = perguntas[i];
    var card = document.createElement('div');
    card.className = 'pergunta-card';
    card.id        = 'card-' + p.id;
    card.innerHTML =
      '<div class="cat-badge">' + p.emoji + ' ' + p.categoria + '</div>' +
      '<div class="pergunta-texto">' + p.texto + '</div>' +
      '<div class="opcoes">' +
        '<button class="btn-opcao" id="sim-' + p.id + '" onclick="responder(\'' + p.id + '\', true)">✅ Sim</button>' +
        '<button class="btn-opcao" id="nao-' + p.id + '" onclick="responder(\'' + p.id + '\', false)">❌ Não</button>' +
      '</div>';
    lista.appendChild(card);
  }
}

/* ── REGISTRAR RESPOSTA ── */
function responder(id, valor) {
  respostas[id] = valor;
  document.getElementById('sim-' + id).className = valor === true  ? 'btn-opcao ativo-sim' : 'btn-opcao';
  document.getElementById('nao-' + id).className = valor === false ? 'btn-opcao ativo-nao' : 'btn-opcao';
  document.getElementById('card-' + id).className = 'pergunta-card respondida';
  atualizarProgresso();
  salvarNoStorage();
}

/* ── BARRA DE PROGRESSO ── */
function atualizarProgresso() {
  var feitas = Object.keys(respostas).length;
  var total  = perguntas.length;
  document.getElementById('prog-fill').style.width = Math.round((feitas / total) * 100) + '%';
  document.getElementById('prog-texto').textContent = feitas + ' de ' + total + ' respondidas';
}

/* ── LOCAL STORAGE ── */
function salvarNoStorage() {
  localStorage.setItem('ss_nome', document.getElementById('nome-usuario').value);
  localStorage.setItem('ss_respostas', JSON.stringify(respostas));
}

function carregarDoStorage() {
  var nome = localStorage.getItem('ss_nome');
  var resp = localStorage.getItem('ss_respostas');
  if (nome) document.getElementById('nome-usuario').value = nome;
  if (resp) {
    respostas = JSON.parse(resp);
    for (var id in respostas) {
      var val = respostas[id];
      if (!document.getElementById('sim-' + id)) continue;
      document.getElementById('sim-' + id).className = val === true  ? 'btn-opcao ativo-sim' : 'btn-opcao';
      document.getElementById('nao-' + id).className = val === false ? 'btn-opcao ativo-nao' : 'btn-opcao';
      document.getElementById('card-' + id).className = 'pergunta-card respondida';
    }
    atualizarProgresso();
  }
}

/* ── VER RESULTADO ── */
function verResultado() {
  var nome = document.getElementById('nome-usuario').value.trim();
  if (!nome) { alert('Por favor, escreva seu nome antes de continuar.'); return; }
  if (Object.keys(respostas).length < perguntas.length) {
    alert('Responda todas as perguntas antes de ver o resultado!');
    return;
  }

  var totalSim = 0;
  for (var id in respostas) { if (respostas[id] === true) totalSim++; }

  var nivel, emoji, titulo, desc, corClass, corHex;
  if (totalSim === 0) {
    nivel = 'Baixo'; emoji = '🛡️'; corClass = 'nivel-baixo'; corHex = '#1a7a4a';
    titulo = nome + ', você está bem protegido!';
    desc   = 'Ótimo! Você não relatou situações de risco recentes. Continue sempre atento.';
  } else if (totalSim <= 3) {
    nivel = 'Moderado'; emoji = '⚠️'; corClass = 'nivel-medio'; corHex = '#c05a00';
    titulo = nome + ', fique de olho!';
    desc   = 'Você passou por ' + totalSim + ' situação suspeita. Leia as orientações abaixo.';
  } else {
    nivel = 'Alto'; emoji = '🚨'; corClass = 'nivel-alto'; corHex = '#a51b1b';
    titulo = nome + ', atenção urgente!';
    desc   = 'Você relatou ' + totalSim + ' situações de risco. Fale com um familiar ou seu banco.';
  }

  var html = '';

  html += '<div class="res-header ' + corClass + ' animar">';
  html += '<span class="res-emoji">' + emoji + '</span>';
  html += '<h2>' + titulo + '</h2><p>' + desc + '</p></div>';

  html += '<div class="score-bloco animar">';
  html += '<div class="score-circulo" style="border-color:' + corHex + ';color:' + corHex + '">' + totalSim + '/8</div>';
  html += '<div class="score-info"><div class="score-label">Situações de risco identificadas</div>';
  html += '<div class="score-nivel" style="color:' + corHex + '">Nível ' + nivel + '</div></div></div>';

  if (totalSim > 0) {
    html += '<p class="secao-titulo">Orientações para você</p>';
    for (var pid in respostas) {
      if (respostas[pid] === true && recomendacoes[pid]) {
        var r = recomendacoes[pid];
        html += '<div class="recom-card recom-' + r.tipo + ' animar">';
        html += '<div class="r-icone">' + r.icone + '</div>';
        html += '<div><h4>' + r.titulo + '</h4><p>' + r.texto + '</p></div></div>';
      }
    }
  } else {
    html += '<div class="recom-card recom-ok animar"><div class="r-icone">🎉</div>';
    html += '<div><h4>Parabéns!</h4><p>Continue desconfiando de situações suspeitas.</p></div></div>';
  }

  html += '<p class="secao-titulo">Dicas para sempre</p>';
  for (var j = 0; j < dicasGerais.length; j++) {
    var d = dicasGerais[j];
    html += '<div class="recom-card recom-dica animar"><div class="r-icone">' + d.icone + '</div>';
    html += '<div><h4>' + d.titulo + '</h4><p>' + d.texto + '</p></div></div>';
  }

  html += '<p class="secao-titulo">Suas respostas</p>';
  for (var k = 0; k < perguntas.length; k++) {
    var pq   = perguntas[k];
    var resp = respostas[pq.id];
    html += '<div class="detalhe-card"><div class="detalhe-texto">' + pq.emoji + ' ' + pq.texto + '</div>';
    html += '<div class="detalhe-resp ' + (resp ? 'resp-sim' : 'resp-nao') + '">' + (resp ? 'Sim' : 'Não') + '</div></div>';
  }

  html += '<button class="btn-reiniciar" onclick="reiniciar()">🔄 Responder novamente</button>';

  var secRes = document.getElementById('secao-resultado');
  secRes.innerHTML     = html;
  secRes.style.display = 'block';
  document.getElementById('secao-checklist').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── REINICIAR ── */
function reiniciar() {
  respostas = {};
  localStorage.removeItem('ss_nome');
  localStorage.removeItem('ss_respostas');
  document.getElementById('nome-usuario').value = '';
  montarPerguntas();
  atualizarProgresso();
  document.getElementById('secao-resultado').style.display  = 'none';
  document.getElementById('secao-resultado').innerHTML      = '';
  document.getElementById('secao-checklist').style.display  = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
