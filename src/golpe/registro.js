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

    if (totalGeral === 0) {
        graficoBarras.innerHTML = "<p style='text-align:center; color:#666;'>Nenhum golpe registrado ainda.</p>";
        return;
    }

    const cores = {
        "Fraude de Consumo":   "#FDC600", 
        "Parceiro Virtual":    "#86c5ff", 
        "Suposta Autoridade":  "#1E4D68", 
        "Roubo de Dados":      "#2ecc71"  
    };

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

        legendaHTML += `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 24px; height: 24px; background: ${cor}; border-radius: 4px; flex-shrink: 0;"></div>
                <span style="font-size: 20px; font-weight: 500; color: #333;">
                    <strong>${total}</strong> - ${tipo} (${porcentagem.toFixed(0)}%)
                </span>
            </div>
        `;
    });

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

// Renderiza a lista de relatos em formato de Mural Dinâmico com Scroll
function renderizarComentarios(dados) {
    const listaComentarios = document.getElementById("lista-comentarios");
    
    if (!listaComentarios) return;

    // Se não houver dados salvos
    if (!dados || dados.length === 0) {
        listaComentarios.innerHTML = "<p style='text-align:center; color:#666;'>Nenhum relato enviado ainda.</p>";
        return;
    }

    // Ordena do mais recente para o mais antigo
    const relatosInvertidos = [...dados].reverse().slice(0,3);
    let estruturaHTML = "";

    relatosInvertidos.forEach(item => {
        // Validação preventiva do campo de texto (tenta .email ou .detalhes)
        const textoComentario = item.email || item.detalhes || "Texto do relato indisponível";
        
        // Formatação da data segura
        let dataFormatada = "Data não informada";
        if (item.data_ocorrencia) {
            dataFormatada = item.data_ocorrencia.split('-').reverse().join('/');
        }

        estruturaHTML += `
            <div style="
                background: #e3f4ff; 
                border-left: 6px solid #11699c; 
                padding: 20px; 
                border-radius: 8px; 
                box-shadow: 0 4px 12px rgba(75, 132, 255, 0.47);
                margin-bottom: 20px;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                    <span style="background: #285772; color: #f8f4f4; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: bold;">
                        ${item.tipo_golpe}
                    </span>
                    <span style="font-size: 13px; color: #7f8c8d; font-weight: 500;">
                        📅 Ocorrido em: ${dataFormatada}
                    </span>
                </div>
                <p style="font-size: 16px; color: #2c3e50; line-height: 1.5; margin-bottom: 15px; font-size: 20px;">
                    "${textoComentario}"
                </p>
                <div style="border-top: 1px solid #f1f2f6; padding-top: 10px; font-size: 18px; color: #555; font-weight: 600;">
                    🧓🏽 Relatado por: <span style="color: #042231;">${item.nome || "Anônimo"}</span>
                </div>
            </div>
        `;
    });

    listaComentarios.innerHTML = estruturaHTML;
}

// Executa automaticamente ao carregar a página
carregarEstatisticasERelatos();
