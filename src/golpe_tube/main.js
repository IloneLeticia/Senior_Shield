document.getElementById('btn-confirmar-selecao').addEventListener('click', () => {
    const categoriasSelecionadas = [];

    if (document.getElementById('chk-fraudes-consumo').checked) categoriasSelecionadas.push('fraudesDeConsumo');
    if (document.getElementById('chk-golpe-do-amor').checked) categoriasSelecionadas.push('golpeDoAmor');
    if (document.getElementById('chk-falsa-autoridade').checked) categoriasSelecionadas.push('falsaAutoridade');
    if (document.getElementById('chk-tutoriais').checked) categoriasSelecionadas.push('tutoriais');
    if (document.getElementById('chk-roubo-de-dados').checked) categoriasSelecionadas.push('RouboDeDados');

    if (categoriasSelecionadas.length === 0) {
        alert('Por favor, selecione pelo menos uma categoria.');
        return;
    }

    localStorage.setItem('categoriasFiltro', JSON.stringify(categoriasSelecionadas));

    window.location.href = '/src/golpe_tube/videos.html';
});