# Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="4-Gestão-Configuração.md"> Ambiente e Ferramentas de Trabalho</a></span>

## Tecnologias Utilizadas

Para a implementação da plataforma **SeniorShield**, optamos por uma abordagem tecnológica focada na leveza, acessibilidade e no desempenho em dispositivos de baixo custo, garantindo que o sistema seja facilmente executado por idosos em computadores e celulares antigos.

### Ecossistema Tecnológico
*   **Linguagens de Core & Frameworks:** HTML5 (estruturação semântica), CSS3 (estilização personalizada), JavaScript Vanilla (lógica de interação e manipulação do DOM) e **Bootstrap** (framework responsivo para agilizar o layout e garantir componentes acessíveis).
*   **Controle de Versão e Repositório:** **Git** (gerenciamento local do histórico de código) e **GitHub** (hospedagem do repositório remoto e colaboração do time).
*   **Hospedagem e Deploy:** GitHub Pages / Vercel (hospedagem estática gratuita).
*   **IDE de Desenvolvimento:** Visual Studio Code (VS Code).
*   **Design, Prototipagem e Gestão:** 
    *   **Canva:** Concepção visual da identidade, criação dos wireframes e fluxos de tela.
    *   **Miro:** Framework visual utilizado para a montagem, mapeamento de fluxos e acompanhamento do quadro Kanban de tarefas.
    *   **Gemini (Google):** Inteligência artificial utilizada como suporte na engenharia de prompts para geração de imagens conceituais do projeto.

---

### Fluxo de Experiência do Usuário (User Flow) e Wireframes

O fluxo de interação do usuário é direto e dispensa telas de login ou cadastros obrigatórios, reduzindo a fricção cognitiva para o público idoso. 

*   **[Acesse aqui o arquivo completo dos Wireframes (PDF)](<../../Downloads/Senior Shield V3.pdf>)**

#### Descrição das Telas Estruturadas:
1.  **Tela Inicial / Conteúdo:** Funciona como a central de acolhimento. Exibe o painel de boas-vindas "Você não está sozinho nessa! ❤️", o bloco explicativo de uso, o menu em formato de acordeão para detalhar os golpes de forma expansível e os cards de navegação rápida para as ferramentas internas.
2.  **Módulo de Ferramentas Separadas:**
    *   **Checklist de Risco:** Apresenta perguntas interativas com botões grandes de "Sim" ou "Não" para avaliar o perigo de fraudes.
    *   **Registrar Golpe:** Formulário simplificado para o envio anônimo de relatos.
    *   **Gerador de Boletim:** Tela dividida em colunas que capta dados estruturados e cospe um texto formatado, permitindo cópia em um clique ou exportação em PDF.
    *   **Golpe Tube:** Galeria multimídia com reprodução de conteúdos informativos selecionados.
3.  **Interface de Chat (Assistente Virtual "Netinho"):** Um widget flutuante e persistente no canto inferior direito que se desdobra em uma janela de mensagens direta. Ele oferece balões de fala amigáveis com respostas dinâmicas pré-programadas e suporte de áudio acionável via botão ("Ouvir mensagem") para idosos com limitações visuais.

---

## Arquitetura da Solução

Por ser um projeto sem um módulo de servidor dedicado (backend em nuvem), a arquitetura do **SeniorShield** baseia-se no modelo **Client-Side Storage (Armazenamento no Lado do Cliente)** e carregamento assíncrono local. 

O ecossistema é distribuído conforme o diagrama de fluxo mapeado pelo grupo:

![Fluxo de Arquitetura](<images/userflow.png>)

### Funcionamento dos Módulos:
*   **Camada de Apresentação (Frontend Estático):** Arquivos estruturados através do Bootstrap, HTML e CSS interpretados nativamente pelo navegador do usuário, garantindo tempo de resposta quase instantâneo (< 3s).
*   **Módulo de Lógica e Persistência (JavaScript Local):** 
    *   O cadastro de denúncias e o mural de relatos interagem por meio de persistência de dados local simulada (via `localStorage` do navegador ou via requisições mockadas em arquivos `.json` usando `JSON Server` em ambiente de desenvolvimento).
    *   O gráfico estatístico lê as informações salvas nesse banco local e atualiza visualmente o balanço de fraudes comuns para a comunidade.
*   **Módulo do Assistente "Netinho":** Funciona de forma totalmente estática através de uma árvore de decisão baseada em rotinas JavaScript predefinidas. O assistente simula um diálogo ao mapear cliques em botões específicos da interface de chat e retornar textos pré-configurados em banco, eliminando custos de infraestrutura e dependências de APIs externas de inteligência artificial.