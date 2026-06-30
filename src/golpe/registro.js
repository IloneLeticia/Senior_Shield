const formulario = document.getElementById('form-registrar-golpe');

// Função para buscar os dados do servidor e renderizar o gráfico e relatos
function carregarEstatisticasERelatos() {
    fetch('http://localhost:3000/registro_golpes_sofridos')
        .then(response => response.json())
        .then(golpes => {
            renderizarGrafico(golpes);
            renderizarComentarios(golpes);
        })
        .catch(error => console.error("Erro ao carregar dados do gráfico/relatos:", error));
}

// Cria o gráfico de pizza nativo com legenda estilizada
function renderizarGrafico(dados) {
    const graficoBarras = document.getElementById("grafico-barras");
    
    if (!graficoBarras) return;

    // Mapeamento de contagem
    const contagemTipos = {
        "Fraude de Consumo": 0,
        "Parceiro Virtual": 0,
        "Suposta Autoridade": 0,
        "Roubo de Dados": 0
    };

    let totalGeral = 0;
    dados.forEach(item => {
        if (contagemTipos[item.tipo_golpe] !== undefined) {
            contagemTipos[item.tipo_golpe]++;
            totalGeral++;
        }
    });

    // Se não houver dados salvos, exibe uma mensagem amigável
    if (totalGeral === 0) {
        graficoBarras.innerHTML = "<p style='text-align:center; color:#666;'>Nenhum golpe registrado ainda.</p>";
        return;
    }

    // Cores extraídas e adaptadas diretamente do banner do Netinho
    const cores = {
        "Fraude de Consumo":   "#FDC600", // Amarelo-Ouro / Laranja do banner
        "Parceiro Virtual":    "#86c5ff", // Azul Claro do fundo/título
        "Suposta Autoridade":  "#1E4D68", // Azul Escuro do moletom
        "Roubo de Dados":      "#2ecc71"  // Verde do escudo protetor
    };

    // Calcula os ângulos acumulados para montar as fatias da pizza
    let percentualAcumulado = 0;
    const fatiasGradiente = [];
    let legendaHTML = "";

    Object.keys(contagemTipos).forEach(tipo => {
        const total = contagemTipos[tipo];
        const porcentagem = (total / totalGeral) * 100;
        const cor = cores[tipo];

        if (porcentagem > 0) {
            const inicio = percentualAcumulado;
            percentualAcumulado += porcentagem;
            fatiasGradiente.push(`${cor} ${inicio}% ${percentualAcumulado}%`);
        }

        // Monta a legenda lateral
        legendaHTML += `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 24px; height: 24px; background: ${cor}; border-radius: 4px; flex-shrink: 0;"></div>
                <span style="font-size: 18px; font-weight: 500; color: #333;">
                    <strong>${total}</strong> - ${tipo} (${porcentagem.toFixed(0)}%)
                </span>
            </div>
        `;
    });

    // Renderiza a estrutura da pizza dividida em duas colunas (Gráfico | Legenda)
    graficoBarras.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; padding: 20px 0;">
            <div style="
                width: 250px; 
                height: 250px; 
                border-radius: 50%; 
                background: conic-gradient(${fatiasGradiente.join(', ')});
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                flex-shrink: 0;
            "></div>
            
            <div style="flex: 1; min-width: 250px;">
                ${legendaHTML}
            </div>
        </div>
    `;
}

// Renderiza a lista de relatos simulando caixas de comentários
// Variável global para controlar a página atual do carrossel
let indexCarrosselAtual = 0;
let relatosInvertidosGlobal = [];

// Renderiza a lista de relatos simulando um carrossel dinâmico e elegante
function renderizarComentarios(dados) {
    const listaComentarios = document.getElementById("lista-comentarios");
    
    if (!listaComentarios) return;

    // Filtra e inverte a ordem para exibir do mais recente para o mais antigo
    relatosInvertidosGlobal = [...dados].reverse();

    if (relatosInvertidosGlobal.length === 0) {
        listaComentarios.innerHTML = "<p style='text-align:center; color:#666;'>Nenhum relato enviado ainda.</p>";
        return;
    }

    // Reinicia o índice caso mude o tamanho dos dados
    if (indexCarrosselAtual >= relatosInvertidosGlobal.length) {
        indexCarrosselAtual = 0;
    }

    exibirSlideCarrossel();
}

// Função interna para atualizar visualmente o slide do carrossel
function exibirSlideCarrossel() {
    const listaComentarios = document.getElementById("lista-comentarios");
    const item = relatosInvertidosGlobal[indexCarrosselAtual];
    
    // Converte o formato YYYY-MM-DD para DD/MM/YYYY
    const dataFormatada = item.data_ocorrencia.split('-').reverse().join('/');

    listaComentarios.innerHTML = `
        <div style="
            display: flex; 
            flex-direction: column; 
            justify-content: space-between;
            min-height: 200px;
            background: #ffffff; 
            border-top: 6px solid #1E4D68; 
            padding: 30px; 
            border-radius: 16px; 
            box-shadow: 0 10px 25px rgba(15, 63, 114, 0.08);
            margin: 10px auto 25px auto;
            max-width: 700px;
            position: relative;
            animation: fadeInCarrossel 0.4s ease-in-out;
        ">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <span style="background: #1E4D68; color: #fff; padding: 5px 14px; border-radius: 20px; font-size: 14px; font-weight: bold; letter-spacing: 0.5px;">
                        ${item.tipo_golpe}
                    </span>
                    <span style="font-size: 14px; color: #7f8c8d; font-weight: 500;">
                        📅 Ocorrido em: ${dataFormatada}
                    </span>
                </div>
                <p style="font-size: 19px; color: #2c3e50; line-height: 1.6; font-style: italic; margin-bottom: 20px; font-weight: 400;">
                    "${item.email}"
                </p>
            </div>
            
            <div style="border-top: 1px solid #ecf0f1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 15px; color: #555; font-weight: 600;">
                    👤 Relatado por: <span style="color: #1E4D68;">${item.nome}</span>
                </span>
                <span style="font-size: 14px; color: #bdc3c7; font-weight: bold;">
                    ${indexCarrosselAtual + 1} de ${relatosInvertidosGlobal.length}
                </span>
            </div>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 10px;">
            <button onclick="mudarSlideCarrossel(-1)" style="
                background: #86c5ff; 
                color: #1E4D68; 
                border: none; 
                padding: 10px 20px; 
                border-radius: 30px; 
                font-weight: bold; 
                cursor: pointer; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                transition: all 0.2s;
            " onmouseover="this.style.background='#1E4D68'; this.style.color='#fff'" onmouseout="this.style.background='#86c5ff'; this.style.color='#1E4D68'">
                ◀ Anterior
            </button>
            
            <button onclick="mudarSlideCarrossel(1)" style="
                background: #FDC600; 
                color: #1E4D68; 
                border: none; 
                padding: 10px 25px; 
                border-radius: 30px; 
                font-weight: bold; 
                cursor: pointer; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                transition: all 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Próximo ▶
            </button>
        </div>
    `;
}

// Função para avançar ou voltar no carrossel
function mudarSlideCarrossel(direcao) {
    indexCarrosselAtual += direcao;

    // Loop do carrossel (volta ao início se passar do fim, ou vai para o fim se voltar do início)
    if (indexCarrosselAtual >= relatosInvertidosGlobal.length) {
        indexCarrosselAtual = 0;
    }
    if (indexCarrosselAtual < 0) {
        indexCarrosselAtual = relatosInvertidosGlobal.length - 1;
    }

    exibirSlideCarrossel();
}