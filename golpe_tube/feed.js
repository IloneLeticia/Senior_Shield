document.addEventListener('DOMContentLoaded', () => {
    const tagsContainer = document.getElementById('active-tags-container');
    const videoGrid = document.getElementById('video-results-grid');
    const filtrosAtivos = JSON.parse(localStorage.getItem('categoriasFiltro')) || [];

    if (!tagsContainer || !videoGrid) return;

    tagsContainer.innerHTML = ' ';
    videoGrid.innerHTML = '';

    // Carrega os nomes das categorias para as tags
    fetch('http://localhost:3000/categorias')
        .then(res => res.json())
        .then(categorias => {
            filtrosAtivos.forEach(catId => {
                const categoriaDados = categorias.find(c => c.id === catId);
                if (categoriaDados) {
                    const tag = document.createElement('span');
                    tag.className = 'filter-tag active';
                    tag.textContent = categoriaDados.nome;
                    tagsContainer.appendChild(tag);
                }
            });
        })
        .catch(err => console.error('Erro ao buscar categorias:', err));

  // Carrega a listagem de vídeos por categoria
    fetch('http://localhost:3000/videosPorCategoria')
        .then(res => res.json())
        .then(videosPorCategoria => {
            filtrosAtivos.forEach(catId => {
                const videos = videosPorCategoria[catId] || [];
                
                videos.forEach((videoObj) => {
                    // Extrai o ID final da URL do embed para achar a thumb do YouTube
                    var videoId = videoObj.url.split("/").pop();

               if (videoId.indexOf("?") != -1) {
               videoId = videoId.split("?")[0];
                                               }
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

                    const card = document.createElement('div');
                    card.className = 'video-card';
                    card.style.cursor = 'pointer';
                    card.style.border = '5px solid #2356a3 ';
                    card.style.margin = '10px';
                   
                    card.style.borderRadius = '10px';
                    
                    card.innerHTML = `
                        <div class="video-thumb-container" style="text-align:center;">
                            <img src="${thumbnailUrl}" alt="Miniatura do vídeo" style="width:100%; max-width:240px; height:auto; border-radius:4px;">
                        </div>
                        <div class="video-info" style="margin-top:8px;">
                            <h3 style="font-size:1.1rem; margin-bottom:4px;">${videoObj.titulo}</h3>
                            <p style="font-size:0.9rem; color:#666;">Clique para assistir</p>
                        </div>
                    `;

                   card.addEventListener('click', function () {

    localStorage.setItem(
        "videoUrlSelecionado",
        videoObj.url
    );

    localStorage.setItem(
        "videoTituloSelecionado",
        videoObj.titulo
    );

    localStorage.setItem(
        "videoCriadorSelecionado",
        JSON.stringify(videoObj.criador)
    );

    localStorage.setItem(
        "videoLinksSelecionados",
        JSON.stringify(videoObj.linksUsados)
    );

    window.location.href = "video_selecionado.html";
});

                    videoGrid.appendChild(card);
                });
            });
        })
        .catch(err => console.error('Erro ao buscar vídeos:', err));

    document.getElementById('btn-nav-home').addEventListener('click', () => {
        window.location.href = 'golpetube_main.html';
    });
});