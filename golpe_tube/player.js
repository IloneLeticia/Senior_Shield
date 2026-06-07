document.addEventListener("DOMContentLoaded", function () {

    var urlSelecionada = localStorage.getItem("videoUrlSelecionado");
    var tituloSelecionado = localStorage.getItem("videoTituloSelecionado");

    var playerContainer = document.getElementById("video-player");
    var tituloContainer = document.getElementById("video-titulo");

    var nomeDoCanalTexto = document.getElementById("nome-do-canal-texto");
    console.log(nomeDoCanalTexto);
    var btnVisitarCanal = document.getElementById("btn-visitar-canal");
    var listaLinksCustom = document.getElementById("lista-links-custom");


    // Coloca o vídeo na página
    if (urlSelecionada != null && playerContainer != null) {

        playerContainer.innerHTML =
            '<iframe width="100%" height="450" src="' + urlSelecionada + '"' +
            ' title="YouTube video player" frameborder="0"' +
            ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
            ' allowfullscreen></iframe>';
    }


    // Coloca o título
    if (tituloSelecionado != null && tituloContainer != null) {
        tituloContainer.innerHTML = "<strong>" + tituloSelecionado + "</strong>";
    }

console.log(localStorage.getItem("videoCriadorSelecionado"));
    // Dados do criador
    var criadorDados = JSON.parse(localStorage.getItem("videoCriadorSelecionado"));

    if (criadorDados != null) {

        if (nomeDoCanalTexto != null) {
            nomeDoCanalTexto.textContent = criadorDados.nome;
        }

        if (btnVisitarCanal != null) {
            btnVisitarCanal.href = criadorDados.canal;
        }
    }


    // Links usados no vídeo
    var linksDados = JSON.parse(localStorage.getItem("videoLinksSelecionados"));

    if (linksDados == null) {
        linksDados = [];
    }

    if (listaLinksCustom != null) {

        listaLinksCustom.innerHTML = "";

        if (linksDados.length == 0 || linksDados[0] == "-") {

            var divMensagem = document.createElement("div");
            divMensagem.textContent = "nenhum link utilizado";

            listaLinksCustom.appendChild(divMensagem);
        }
        else {

            for (var i = 0; i < linksDados.length; i++) {

                var linkAtual = linksDados[i];

                var divLink = document.createElement("div");

                divLink.innerHTML =
                    '<a href="' + linkAtual + '" target="_blank">' +
                    linkAtual +
                    '</a>';

                listaLinksCustom.appendChild(divLink);
            }
        }
    }


    // Botão voltar
    document.getElementById("btn-video-back").addEventListener("click", function () {
        window.location.href = "videos.html";
    });


    // Botão home
    document.getElementById("btn-video-home").addEventListener("click", function () {
        window.location.href = "golpetube_main.html";
    });

});