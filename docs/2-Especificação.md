# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

Esta seção detalha os requisitos da plataforma **SeniorShield**, mapeando o escopo da solução a partir das necessidades dos usuários. Para isso, utilizamos as técnicas de definição de Personas, Histórias de Usuários e levantamento de Requisitos Funcionais (RF), Não Funcionais (RNF) e Restrições de Projeto.

## Personas
![alt text](9d114333-8765-4f9a-8f27-e9eae414359a.jpg)
![alt text](6c3079ce-de17-4e7a-9b9b-9b7299f1b51c.jpg)
![alt text](c27da210-e95f-42d9-9c5e-8d5e5c6f48ab.jpg)
![alt text](fe97089a-f871-401f-804c-94017937ca4f.jpg)
![alt text](ffb52797-3f85-4f6a-9f6a-4bc5846217bc.jpg)

## Histórias de Usuários
![alt text](d3c3727a-f335-4e63-915f-b16a51074e43.jpg)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| **GolpeTube:** O sistema deve disponibilizar uma seção de vídeos selecionados do YouTube com filtros temáticos sobre golpes. | ALTA | 
|RF-002| **Acordeão de Golpes:** O sistema deve exibir um menu retrátil (accordion) com tipos de golpes que redirecione o usuário para o vídeo equivalente dentro do GolpeTube. | ALTA |
|RF-003| **Checklist de Risco:** O sistema deve oferecer um questionário interativo (checklist) para o usuário avaliar o nível de risco de uma situação suspeita. | MÉDIA |
|RF-004| **Cadastrar Golpe:** O sistema deve permitir que o usuário envie um relato/denúncia cadastrando um golpe que sofreu. | ALTA |
|RF-005| **Gráfico de Golpes:** O sistema deve exibir um gráfico estatístico atualizado com os tipos de golpes mais registrados pelos usuários. | MÉDIA |
|RF-006| **Mural de Relatos:** O sistema deve exibir uma área pública com a lista de relatos de golpes enviados pelos usuários (preservando o anonimato). | MÉDIA |
|RF-007| **Assistente Virtual "Netinho":** O sistema deve possuir um assistente virtual/chatbot (Netinho) para interagir, guiar e tirar dúvidas dos idosos de forma simples. | ALTA |
|RF-008| **Gerador de Boletim:** O sistema deve gerar um documento formatado de boletim de ocorrência com base nos dados que o usuário preencheu. | ALTA |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| **Acessibilidade:** A interface deve seguir boas práticas de acessibilidade para a terceira idade (alto contraste, fontes ampliadas, botões grandes e leitura limpa para o assistente "Netinho"). | ALTA | 
|RNF-002| **Responsividade:** O sistema deve ser responsivo, adaptando o layout dos gráficos, do checklist e dos vídeos do GolpeTube perfeitamente para celulares e computadores. | ALTA |
|RNF-003| **Desempenho de Mídia:** O carregamento dos vídeos incorporados do YouTube (GolpeTube) e a renderização do gráfico de golpes não devem travar a navegação do usuário. | MÉDIA |
|RNF-004| **Persistência de Dados Local:** O armazenamento dos relatos e golpes cadastrados deve ser feito de forma leve via localStorage ou JSON Server, sem exigir infraestrutura complexa de banco de dados. | ALTA |
|RNF-005| **Privacidade e Anonimato:** O sistema não deve expor dados sensíveis ou informações de identificação pessoal dos usuários no mural público de relatos de golpes. | ALTA |
|RNF-006| **Facilidade de Uso (Usabilidade):** O assistente virtual "Netinho" e o checklist de risco devem usar uma linguagem extremamente simples, direta e sem termos técnicos complexos. | MÉDIA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre letivo corrente. |
|02| Não pode ser desenvolvido um módulo de backend robusto ou proprietário (deve-se usar persistência local como localStorage ou simulação com JSON Server). |
|03| O desenvolvimento do frontend deve utilizar estritamente tecnologias web padrão: HTML5, CSS3 e JavaScript Vanilla. |
|04| O custo de desenvolvimento e hospedagem da solução deve ser zero (R$ 0,00), utilizando ferramentas gratuitas. |