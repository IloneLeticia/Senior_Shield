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

    // Cores definidas para cada tipo de golpe
    const cores = {
        "Fraude de Consumo": "#1e72a7",
        "Parceiro Virtual": "#2c83b9",
        "Suposta Autoridade": "#0f3f72",
        "Roubo de Dados": "#bcd7e9"
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
function renderizarComentarios(dados) {
    const listaComentarios = document.getElementById("lista-comentarios");
    
    // Se o elemento não existir nesta página, não faz nada
    if (!listaComentarios) return;

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

// "Escuta" o evento de envio (submit) do formulário apenas se ele existir na página
if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome-completo').value;
        const detalhesOcorrido = document.getElementById('email').value; 
        const golpeSofrido = document.getElementById('golpe-sofrido').value;
        const valorPerdido = document.getElementById('valor-perdidio').value;
        const dataOcorrencia = document.getElementById('data-ocorrencia').value;

        fetch('http://localhost:3000/registro_golpes_sofridos')
            .then(response => response.json())
            .then(golpesExistentes => {
                const proximoIdGolpe = String(golpesExistentes.length + 1);

                const novoGolpe = {
                    id_golpe: proximoIdGolpe,
                    nome: nome,
                    tipo_golpe: golpeSofrido,
                    email: detalhesOcorrido, 
                    valor_perdido: valorPerdido,
                    data_ocorrencia: dataOcorrencia
                };

                return fetch('http://localhost:3000/registro_golpes_sofridos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoGolpe)
                });
            })
            .then(response => {
                if (response.ok) {
                    alert("Muito obrigado! O golpe foi registrado com sucesso e ajudará a comunidade.");
                    formulario.reset(); 
                    carregarEstatisticasERelatos(); 
                } else {
                    alert("Poxa, ocorreu um erro ao registrar. Tente novamente mais tarde.");
                }
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
                alert("Erro de conexão. Verifique se o JSON Server está rodando no terminal.");
            });
    });
}

// Carrega os componentes ao abrir a tela
carregarEstatisticasERelatos();