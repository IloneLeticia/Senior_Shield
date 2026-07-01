var acc = document.getElementsByClassName("accordion");

document.getElementById("texto_explicativo").innerHTML = `<section class="intro-suporte">
  <div class="descricao-geral-texto">
    <h2>A internet é para você sim!</h2>
    <p>Criamos este espaço porque sabemos que o mundo digital pode parecer confuso e acelerado demais. Cair em golpes acontece com quem usa a internet, e a culpa <strong>nunca</strong> é da vítima, mas sim dos criminosos que agem de má-fé. Aqui, você pode ler tudo no seu tempo, com letras grandes e explicações simples. Navegue sem medo, estamos aqui para proteger você.</p>
  </div>

  <div class="como-funciona-passos">
    <h2>Como usar o SeniorShield?</h2>
    <p>É muito fácil usar o nosso site para se proteger. Veja o que preparamos para você:</p>
    <ol>
      <li><strong>Conheça os perigos:</strong> Logo abaixo, clique nos blocos azuis para descobrir quais são os golpes mais comuns e os sinais para ligar o sinal de alerta.</li>
      <li><strong>Assista e aprenda:</strong> No menu <strong>Golpe Tube</strong>, temos vídeos curtos e explicativos que mostram os golpes acontecendo na prática.</li>
      <li><strong>Faça um teste:</strong> Está na dúvida se uma mensagem ou ligação é falsa? Use o nosso <strong>Checklist de Risco</strong> para avaliar a situação em poucos minutos.</li>
      <li><strong>Caiu em um golpe? Nós te ajudamos:</strong> Não tenha vergonha, isso pode acontecer com qualquer um. Se você foi vítima de uma fraude, use a página <strong>Registrar Golpe</strong> para nos contar o que aconteceu e alertar outros idosos. Você também pode usar o nosso <strong>Gerador de Boletim</strong> para criar um texto prontinho com a sua denúncia para enviar à Delegacia Virtual de forma simples.</li>
      <li><strong>Fale com o Netinho:</strong> Precisa de uma ajuda rápida ou quer apenas conversar? No cantinho inferior direito da tela, clique no ícone do nosso assistente virtual. Ele funciona como um guia direto e interativo, te indicando caminhos e tirando dúvidas de forma simples, sem enrolação.</li>
    </ol>
  </div>
</section>`;

for (let i = 0; i < acc.length; i++) {

  // clicar acordeão
  acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

  });

  // mouse por cima
  acc[i].addEventListener("mouseover", function() {
    this.style.transform = "scale(1.02)";
  });

  // quando sai o mouse
  acc[i].addEventListener("mouseout", function() {
    this.style.transform = "scale(1)";
  });

}


// FETCH DOS GOLPEs

fetch('http://localhost:3000/principais_tipos_de_golpe')
  .then(response => response.json())
  .then(golpes => {

    for (let i = 0; i < golpes.length; i++) {

      document.getElementById(`descricao-do-golpe${i+1}`).innerHTML =
      golpes[i].descricao_detalhada;

      let listaSinais = '';

      for (let a = 0; a < golpes[i].sinais_principais.length; a++) {
        listaSinais += `<li>${golpes[i].sinais_principais[a]}</li>`;
      }

      document.getElementById(`sinais-do-golpe${i+1}`).innerHTML = `
        <ul>
          <strong>SINAIS:</strong>
          ${listaSinais}
        </ul>
      `;

      document.getElementById(`golpe-${i+1}`).innerHTML =
      `<h2>${golpes[i].titulo}</h2>`;

      document.getElementById(`link-tutorial-abaixo${i+1}`).innerHTML =
      golpes[i].texto_chamada_tutorial;

      let link = document.getElementById(`link-${i+1}`);

      
      link.href = "#"; 

      link.addEventListener("click", function(evento) {
        evento.preventDefault(); 

        // Faz o fetch direto na chave de vídeos por categoria do seu servidor
        fetch('http://localhost:3000/videosPorCategoria')
          .then(res => res.json())
          .then(categoriasDeVideo => {
            
           
            var listaTutoriais = categoriasDeVideo["tutoriais"];

            if (listaTutoriais) {
              var videoSelecionado = null;

             
              if (i === 0) {
                // Primeiro Golpe: Fraude de Consumo -> Vídeo ID 14 (identifique lojas falsas)
                videoSelecionado = listaTutoriais.find(v => v.id === 14);
              } 
              else if (i === 1) {
                // Segundo Golpe: Parceiro Virtual -> Vídeo ID 17 (GOLPE DO AMOR)
                videoSelecionado = listaTutoriais.find(v => v.id === 17);
              } 
              else if (i === 2) {
                // Terceiro Golpe: Suposta Autoridade -> Vídeo ID 15 (o golpe da falsa autoridade)
                videoSelecionado = listaTutoriais.find(v => v.id === 15);
              } 
              else if (i === 3) {
                // Quarto Golpe: Roubo de Dados -> Vídeo ID 13 (ROUBO DE DADOS na internet)
                videoSelecionado = listaTutoriais.find(v => v.id === 13);
              }

              // Se o vídeo foi encontrado na lista, salva as propriedades dele no localStorage
              if (videoSelecionado) {
                
               
                localStorage.setItem("videoUrlSelecionado", videoSelecionado.url);
                localStorage.setItem("videoTituloSelecionado", videoSelecionado.titulo);
                localStorage.setItem("videoCriadorSelecionado", JSON.stringify(videoSelecionado.criador));
                localStorage.setItem("videoLinksSelecionados", JSON.stringify(videoSelecionado.linksUsados));

                window.open("golpe_tube/video_selecionado.html", "_blank");

              } else {
                alert("O vídeo configurado para este golpe não foi encontrado.");
              }
            }
          })
          .catch(err => console.error('Erro ao buscar a categoria de tutoriais:', err));
      });

      // EVENTO NO LINK (MOUSEOVER/OUT)
      link.addEventListener("mouseover", function() {
        link.style.transform = "scale(1.1)";
      });

      link.addEventListener("mouseout", function() {
        link.style.transform = "scale(1)";
      });

    } // <--- FECHAMENTO DO LOOP FOR DE GOLPES

  }) // <--- FECHAMENTO DO THEN DE GOLPES 
  .catch(error => console.error('Erro ao carregar golpes:', error));



// FETCH DAS DESCRIÇÕES

fetch('http://localhost:3000/descricoes')
  .then(response => response.json())
  .then(descricao => {

    document.getElementById("descricao-geral").innerHTML =
    descricao[0].descricao_principal;

    document.getElementById("fim_pagina").innerHTML =
    descricao[0].descricao_secundaria;

  })
  .catch(error => console.error('Erro ao carregar descrições:', error));
  function carregarEstatisticasERelatos() {
    fetch('http://localhost:3000/registro_golpes_sofridos')
        .then(response => response.json())
        .then(golpes => {
            renderizarGrafico(golpes);
            renderizarComentarios(golpes);
        })
        .catch(error => console.error("Erro ao carregar dados do gráfico/relatos:", error));
}

// Cria o gráfico de barras horizontais nativo
function renderizarGrafico(dados) {
    const graficoBarras = document.getElementById("grafico-barras");
    
    // Mapeamento de contagem
    const contagemTipos = {
        "Fraude de Consumo": 0,
        "Parceiro Virtual": 0,
        "Suposta Autoridade": 0,
        "Roubo de Dados": 0
    };

    dados.forEach(item => {
        if (contagemTipos[item.tipo_golpe] !== undefined) {
            contagemTipos[item.tipo_golpe]++;
        }
    });

    const maiorQuantidade = Math.max(...Object.values(contagemTipos), 1);

    graficoBarras.innerHTML = "";
    Object.keys(contagemTipos).forEach(tipo => {
        const total = contagemTipos[tipo];
        const larguraPorcentagem = (total / maiorQuantidade) * 100;

        graficoBarras.innerHTML += `
            <div style="margin-bottom: 20px;">
                <span style="font-size: 18px; font-weight: 700; color: #0f3f72; display: block; margin-bottom: 5px;">${tipo}</span>
                <div style="display: flex; align-items: center; gap: 15px; background: #f0f4f8; border-radius: 8px; overflow: hidden;">
                    <div style="height: 35px; background: linear-gradient(90deg, #1e72a7, #2c83b9); width: ${larguraPorcentagem}%; transition: width 0.5s ease;"></div>
                    <span style="font-weight: bold; font-size: 18px; color: #1e72a7; padding-right: 15px; white-space: nowrap;">${total} ${total === 1 ? 'registro' : 'registros'}</span>
                </div>
            </div>
        `;
    });
}

// Renderiza a lista de relatos simulando caixas de comentários
function renderizarComentarios(dados) {
    const listaComentarios = document.getElementById("lista-comentarios");
    listaComentarios.innerHTML = "";

    // Exibe do mais recente para o mais antigo
    const dadosInvertidos = [...dados].reverse();

    dadosInvertidos.forEach(item => {
        // Converte o formato YYYY-MM-DD para DD/MM/YYYY amigável
        const dataFormatada = item.data_ocorrencia.split('-').reverse().join('/');

        listaComentarios.innerHTML += `
            <div style="background: #e4eeff; border-left: 6px solid #1e72a7; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 16px; color: #555; margin-bottom: 8px;">
                    <span style="background: #0f3f72; color: #fff; padding: 2px 10px; border-radius: 20px; font-size: 14px; font-weight: bold;">${item.tipo_golpe}</span>
                    <span>Ocorrido em: ${dataFormatada}</span>
                </div>
                <p style="font-size: 18px; color: #222; line-height: 1.6; font-style: italic;">"${item.email}"</p>
                <span style="font-size: 14px; color: #666; display: block; margin-top: 5px;">Relatado por: ${item.nome}</span>
            </div>
        `;
    });
}
// === LÓGICA DO ASSISTENTE NETINHO ===

// Função para abrir e fechar a janela do chat
window.toggleChat = function() {
  const chat = document.getElementById('netinho-chat-window');
  const chatBody = document.getElementById('chat-mensagens');
  
  // Alterna o estado de exibição
  if (chat.style.display === 'none') {
    chat.style.display = 'flex';
    // Rola para o final da conversa quando abrir
    chatBody.scrollTop = chatBody.scrollHeight;
  } else {
    chat.style.display = 'none';
  }
};

// Função que define os botões do menu inicial
function mostrarMenuInicial() {
  const chatOpcoes = document.getElementById('chat-opcoes');
  
  chatOpcoes.innerHTML = `
    <button onclick="responder('Estou assustado')">Estou assustado</button>
    <button onclick="responder('Caí em um golpe')">Caí em um golpe, preciso de ajuda</button>
    <button onclick="responder('Ver ferramentas')">Ver ferramentas de proteção</button>
    <button onclick="responder('Só quero conversar')">Só quero conversar</button>
  `;
  chatOpcoes.style.display = 'flex';
}

// Função que define o menu de ferramentas (links diretos)
function mostrarMenuFerramentas() {
  const chatBody = document.getElementById('chat-mensagens');
  const chatOpcoes = document.getElementById('chat-opcoes');

  chatBody.innerHTML += `<div class="mensagem netinho">Aqui estão as ferramentas que temos para te proteger:</div>`;
  
  chatOpcoes.innerHTML = `
    <button onclick="window.location.href='checklist/checklist.html'">Checklist de Risco</button>
    <button onclick="window.location.href='golpe/cadastrar_golpe.html'">Registrar Golpe</button>
    <button onclick="window.location.href='boletim/index.html'">Gerar Boletim</button>
    <button onclick="window.location.href='golpe_tube/golpetube_main.html'">Assistir no Golpe Tube</button>
    <button onclick="voltarAoInicio()" style="background: #e4eeff; border-color: #0f3f72;">⬅ Voltar ao início</button>
  `;
  
  // CORREÇÃO: Garante que os botões apareçam na tela novamente!
  chatOpcoes.style.display = 'flex';
  
  // Rola para baixo após adicionar a mensagem
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Função para reiniciar a conversa e voltar às opções principais
function voltarAoInicio() {
    const chatBody = document.getElementById('chat-mensagens');
    
    // Mostra que o usuário escolheu voltar
    chatBody.innerHTML += `<div class="mensagem usuario">Voltar ao início</div>`;
    
    // Netinho responde novamente
    chatBody.innerHTML += `<div class="mensagem netinho">Como posso te ajudar agora?</div>`;
    
    // Carrega os botões iniciais
    mostrarMenuInicial();
    
    // Rola a tela para o final
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Função principal de diálogo
function responder(opcao) {
  const chatBody = document.getElementById('chat-mensagens');
  const chatOpcoes = document.getElementById('chat-opcoes');
  
  chatBody.innerHTML += `<div class="mensagem usuario">${opcao}</div>`;
  chatOpcoes.style.display = 'none';
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    let respostaNetinho = "";
    
    if (opcao === 'Ver ferramentas') {
        mostrarMenuFerramentas();
        return; 
    }

    if (opcao === 'Estou assustado') {
      respostaNetinho = "Respire fundo. A internet pode ser intimidante, mas você não precisa enfrentar isso só. O que acha de fazermos um checklist rápido para ver se está tudo bem com sua segurança?";
      chatOpcoes.innerHTML = `
        <button onclick="window.location.href='checklist/checklist.html'">Fazer Checklist</button>
        <button onclick="voltarAoInicio()">Voltar ao início</button>
      `;
    } 
    else if (opcao === 'Caí em um golpe') {
      respostaNetinho = "Sinto muito por isso. A culpa nunca é sua, os criminosos estudam muito para enganar as pessoas. Vamos tomar as medidas necessárias com calma? Você pode registrar o golpe para alertar outros ou gerar um boletim de ocorrência.";
      chatOpcoes.innerHTML = `
        <button onclick="window.location.href='golpe/cadastrar_golpe.html'">Registrar Golpe</button>
        <button onclick="window.location.href='boletim/index.html'">Gerar Boletim</button>
        <button onclick="voltarAoInicio()">Voltar ao início</button>
      `;
    }
    else if (opcao === 'Só quero conversar') {
      respostaNetinho = "Adoro uma boa conversa! Às vezes, só de falar sobre o que estamos sentindo, o peso diminui. Como está sendo o seu dia hoje?";
      chatOpcoes.innerHTML = `
        <button onclick="responder('Está sendo difícil')">Está sendo difícil</button>
        <button onclick="responder('Está tudo bem')">Está tudo bem</button>
        <button onclick="voltarAoInicio()">Voltar ao início</button>
      `;
    }
    else if (opcao === 'Está sendo difícil' || opcao === 'Está tudo bem') {
        respostaNetinho = "Entendo perfeitamente. Lembre-se que estou aqui neste cantinho da tela sempre que precisar. Quer conhecer alguma ferramenta nossa para se sentir mais seguro?";
        chatOpcoes.innerHTML = `
          <button onclick="mostrarMenuFerramentas()">Sim, quero ver</button>
          <button onclick="voltarAoInicio()">Voltar ao início</button>
        `;
    }

    // Adiciona a resposta do Netinho na tela
    chatBody.innerHTML += `<div class="mensagem netinho">${respostaNetinho}</div>`;
    
    // --- MÁGICA DA VOZ AQUI ---
    falar(respostaNetinho); 
    
    chatOpcoes.style.display = 'flex';
    chatBody.scrollTop = chatBody.scrollHeight;
    
  }, 1000);
}

// Inicializa o chat quando o site terminar de carregar
document.addEventListener("DOMContentLoaded", () => {
    mostrarMenuInicial();
});
// === FUNÇÃO DE VOZ (SÓ FALA SE CLICAR) ===
function falar(texto) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance();
        msg.text = texto;
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    }
}

// === LÓGICA DO CHAT ===
window.toggleChat = function() {
  const chat = document.getElementById('netinho-chat-window');
  const chatBody = document.getElementById('chat-mensagens');
  chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
  if(chat.style.display === 'flex') chatBody.scrollTop = chatBody.scrollHeight;
};

function mostrarMenuInicial() {
  const chatOpcoes = document.getElementById('chat-opcoes');
  chatOpcoes.innerHTML = `
    <button onclick="responder('Estou assustado')">Estou assustado</button>
    <button onclick="responder('Caí em um golpe')">Caí em um golpe, preciso de ajuda</button>
    <button onclick="responder('Ver ferramentas')">Ver ferramentas de proteção</button>
    <button onclick="responder('Só quero conversar')">Só quero conversar</button>
  `;
  chatOpcoes.style.display = 'flex';
}

function mostrarMenuFerramentas() {
  const chatBody = document.getElementById('chat-mensagens');
  const chatOpcoes = document.getElementById('chat-opcoes');
  chatBody.innerHTML += `<div class="mensagem netinho">Aqui estão as ferramentas que temos para te proteger:</div>`;
  chatOpcoes.innerHTML = `
    <button onclick="window.location.href='checklist/checklist.html'">Checklist de Risco</button>
    <button onclick="window.location.href='golpe/cadastrar_golpe.html'">Registrar Golpe</button>
    <button onclick="window.location.href='boletim/index.html'">Gerar Boletim</button>
    <button onclick="window.location.href='golpe_tube/golpetube_main.html'">Assistir no Golpe Tube</button>
    <button onclick="voltarAoInicio()" style="background: #e4eeff; border-color: #0f3f72;">⬅ Voltar ao início</button>
  `;
  chatOpcoes.style.display = 'flex';
  chatBody.scrollTop = chatBody.scrollHeight;
}

function voltarAoInicio() {
    const chatBody = document.getElementById('chat-mensagens');
    chatBody.innerHTML += `<div class="mensagem usuario">Voltar ao início</div>`;
    chatBody.innerHTML += `<div class="mensagem netinho">Como posso te ajudar agora?</div>`;
    mostrarMenuInicial();
    chatBody.scrollTop = chatBody.scrollHeight;
}

function responder(opcao) {
  const chatBody = document.getElementById('chat-mensagens');
  const chatOpcoes = document.getElementById('chat-opcoes');
  
  chatBody.innerHTML += `<div class="mensagem usuario">${opcao}</div>`;
  chatOpcoes.style.display = 'none';
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    let resposta = "";
    
    if (opcao === 'Ver ferramentas') { mostrarMenuFerramentas(); return; }

    if (opcao === 'Estou assustado') {
      resposta = "Respire fundo. Você não está sozinho. O que acha de fazermos um checklist rápido para ver se está tudo bem com sua segurança?";
      chatOpcoes.innerHTML = `<button onclick="window.location.href='checklist/checklist.html'">Fazer Checklist</button><button onclick="voltarAoInicio()">Voltar ao início</button>`;
    } 
    else if (opcao === 'Caí em um golpe') {
      resposta = "Sinto muito. A culpa nunca é sua. Vamos tomar as medidas necessárias com calma? Você pode registrar o golpe ou boletim de ocorrência.";
      chatOpcoes.innerHTML = `<button onclick="window.location.href='golpe/cadastrar_golpe.html'">Registrar Golpe</button><button onclick="window.location.href='boletim/index.html'">Gerar Boletim</button><button onclick="voltarAoInicio()">Voltar ao início</button>`;
    }
    else if (opcao === 'Só quero conversar') {
      resposta = "Adoro uma boa conversa! Como está sendo o seu dia hoje?";
      chatOpcoes.innerHTML = `<button onclick="responder('Está sendo difícil')">Está difícil</button><button onclick="responder('Está tudo bem')">Está tudo bem</button><button onclick="voltarAoInicio()">Voltar ao início</button>`;
    }
    else if (opcao === 'Está sendo difícil' || opcao === 'Está tudo bem') {
        resposta = "Entendo perfeitamente. Lembre-se que estou aqui sempre que precisar. Quer conhecer alguma ferramenta para se sentir mais seguro?";
        chatOpcoes.innerHTML = `<button onclick="mostrarMenuFerramentas()">Sim, quero ver</button><button onclick="voltarAoInicio()">Voltar ao início</button>`;
    }

    // Adiciona mensagem + botão de ouvir
    chatBody.innerHTML += `
        <div class="mensagem netinho">
            ${resposta}
            <button onclick="falar('${resposta.replace(/'/g, "")}')" style="margin-top:10px; display:block; background:#1e72a7; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
                🔊 Ouvir mensagem
            </button>
        </div>`;
    
    chatOpcoes.style.display = 'flex';
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => mostrarMenuInicial());
