var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Altera a classe active */
    this.classList.toggle("active");
	
    /* Alternar entre ocultar e mostrar o painel da descrição do golpe */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


//---------------------------------//

fetch('dados.json')
  .then(response => response.json())
  .then(dados => {
    const golpes = dados[0][0].principais_tipos_de_golpe;

    for (let i = 0; i < golpes.length; i++) {
      
    
      document.getElementById(`descricao-do-golpe${i+1}`).innerHTML = golpes[i].descricao_detalhada;

      
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
     
      document.getElementById(`golpe-${i+1}`).innerHTML=`${golpes[i].titulo}`
       
      document.getElementById(`link-tutorial-abaixo`).innerHTML=
      `${golpes[i].texto_chamada_tutorial}`
      document.getElementById(`link-${i+1}`).href=`${golpes[i].tutorial_slug}`; 

     

      
    }
    
    const descricao= dados[1][0].descrições;

    document.getElementById(`descricao-geral`).innerHTML=
    `${descricao[0].descrição_principal}`;

    document.getElementById(`fim_pagina`).innerHTML=`${descricao[0].descrição_secundária}`



  }



)
  .catch(error => console.error('Erro ao carregar o JSON:', error));
  

