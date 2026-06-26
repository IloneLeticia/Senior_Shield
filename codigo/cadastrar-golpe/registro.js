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

// Cria o gráfico de barras horizontais nativo
function renderizarGrafico(dados) {
    const graficoBarras = document.getElementById("grafico-barras");
    
    // Evita o erro caso "dados" não seja um array válido (ex: erro 404)
    if (!Array.isArray(dados)) {
        if (graficoBarras) graficoBarras.innerHTML = "<p style='color: #666;'>Estatísticas indisponíveis no momento.</p>";
        return;
    }

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

    if (graficoBarras) {
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
}

// Renderiza a lista de relatos simulando caixas de comentários
function renderizarComentarios(dados) {
    const listaComentarios = document.getElementById("lista-comentarios");
    
    if (!Array.isArray(dados)) {
        if (listaComentarios) listaComentarios.innerHTML = "<p style='color: #666;'>Não foi possível carregar os relatos agora.</p>";
        return;
    }

    if (listaComentarios) {
        listaComentarios.innerHTML = "";

        // Exibe do mais recente para o mais antigo
        const dadosInvertidos = [...dados].reverse();

        // Se estiver na Home (não tem o formulário), limita a 3 itens para não poluir
        const dadosExibicao = !formulario ? dadosInvertidos.slice(0, 3) : dadosInvertidos;

        dadosExibicao.forEach(item => {
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
}

// "Escuta" o evento de envio (submit) apenas se o formulário existir na página atual
if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome-completo').value;
        const detalhesOcorrido = document.getElementById('email').value; 
        const golpeSofrido = document.getElementById('golpe-sofrido').value;
        const valorPerdido = document.getElementById('valor-perdido').value;
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

// Carrega os componentes ao abrir qualquer uma das telas (Home ou Cadastro)
carregarEstatisticasERelatos();