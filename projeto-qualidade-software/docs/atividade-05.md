# Atividade PBL – Aula 6: Planejamento e Execução de Testes – LocalEats

**Grupo:** Mauticio T Welter, Douglas Santos, Leandro Mandela

**Disciplina:** Qualidade de Software  

**Data:** 21/04/2026

---

## 1. Plano de Testes – Sistema LocalEats

* **Objetivo:** Garantir que as principais funcionalidades do sistema LocalEats funcionem corretamente, com comportamento consistente e sem falhas críticas.

* **Validar:** 

    * Fluxos principais do usuário (login → busca → pedido → avaliação)

    * Tratamento de erros

    * Consistência dos dados exibidos

---

## 2. Escopo

* **Estratégia de testes**

    * teste funcional de caixa-preta

    * Técnica usada: BDD (Given / When / Then)

    * Dado (Given) → contexto

    * Quando (When) → ação

    * Então (Then) → resultado


* **O que será testado**

    * Login de usuário

    * Cadastro de usuário

    * Busca de restaurantes

    * Visualização de restaurante

    * Realização de pedidos

    * Avaliação de restaurantes


* **O que NÃO será testado**

    * Performance (tempo de resposta, carga)

    * Segurança avançada (SQL Injection, etc.)

    * Testes mobile específicos 

    * Integrações externas complexas (pagamento real, APIs externas)

* **Funcionalidades Selecionadas:**

    * Autenticação (Login/Cadastro)

    * Busca de restaurantes(Busca por culinária na barra de pesquisa)

    * Carrinho/Pedido (Verificar Carrinho e histórico de pedidos)

    * Avaliação(Possibilidade do usuário fazer avaliações)

---

## 3. Casos de Teste LocalEats

* CT01 - cadastro com sucesso

* CT02 - cadastro sem sucesso

* CT03 - login com sucesso 

* CT04 - login sem sucesso

* CT05 - busca por Culinária na barra de pesquisa sem sucesso

* CT06 - realizar pedidos na pagina do restaurante com sucesso

* CT07 - avaliar restaurante sem sucesso 

---

## 4. Execução dos Testes

* **ID: CT01**

    * Título: Cadastro de usuário com dados válidos

    * Pré-condição: Usuário não cadastrado no sistema

    * Passos:

    * Dado que estou na página de cadastro

    * E informo um nome válido

    * E informo um e-mail válido

    * E informo uma senha válida

    * Quando clico no botão Registrar


    * Resultado :

    * Então o sistema realiza o cadastro com sucesso

    * E redireciona o usuário para a página inicial ou login

* **ID: CT02**

    * Título: Cadastro de usuário com dados inválidos

    * Pré-condição: Usuário não cadastrado no sistema

    * Passos:

    * Dado que estou na página de cadastro

    * E informo um nome válido

    * E informo um e-mail válido (teste utilizado "amandapereira.com")

    * E informo uma senha válida

    * Quando clico no botão Registrar

    * Resultado :

    * Então o sistema realiza não realiza o cadastro e informa ("inclua um @ no endereço de email")

    * os dados permanecem nos campos do cadastro aguardanto a alteração para um email valido

* **ID: CT03**

    * Título: Login com credenciais válidas

    * Pré-condição: UUsuário já cadastrado

    * Passos:

    * Dado que estou na página de login

    * E informo um e-mail válido já cadastrado ("douglas@teste.com")

    * E informo a senha correta ("senha123")

    * Quando clico no botão Entrar

    * Resultado :

    * Então o sistema redireciona para a página inicial

    * E exibe restaurantes disponíveis

* **ID: CT04**

    * Título: Login com credenciais senha inválida

    * Passos:

    * Dado que estou na página de login

    * E informo um e-mail válido já cadastrado ("douglas@teste.com")

    * E informo a senha correta ("123456")

    * Quando clico no botão Entrar

    * Resultado :

    * Então o sistema permanece na página de login

    * E exibe mensagem de "invalid credentials" exibido em vermelho acima do campo email 

* **ID: CT05**

    * Título: Busca por culinária inexistente

    * Passos:

    * Dado que estou na página inicial

    * E informo uma culinária existente na barra de pesquisa (foram pesquisadas termos "Japonesa","Italiana")

    * Quando realizo a busca

    * Resultado Eserado:

    * Então o sistema não retorna resultados

    * E exibe mensagem  com letras brancas “nenhum resultado encontrado.”

* **ID: CT06**

    * Título: Realizar pedido com sucesso

    * Pré-condição: Usuário logado

    * Passos:

    * Dado que estou na página do "Restaurante Sabor 1"

    * E seleciono ao clicar no botão "+ Adicionar"  um ou mais itens do cardápio 

    * E adiciono ao carrinho 

    * surge o carrinho com o numero de itens em vermelho 

        * a quantidade e o nome de cada prato selecionado e o valor unitario 

        * o total do pedido  em negrito com fonte maior 

        * potão finalizar com efeito degrade  roza e roxo escrito com letras brancas      "Finalizar pedido"

    * Resultado :

    * Então o pedido é realizado ao clicar "Finalizar pedido" 

    * Surge no centro da tela a mensagem "Pedido Realizado! Seu pedido de teste foi enviado com sucesso." abaixo surge o botão "Ver Detalhes"  

    * ao clicar em " Ver detalhes" entramos na pagina de meus pedidos temos a comprovação con o numero do pedido feito e os detalhes do pedido. 

* **ID: CT07**

    * Título: Avaliação inválida de restaurante

    * Pré-condição: Usuário logado

    * Passos:

    * Dado que estou na página do "Restaurante Sabor 1"

    * E  ao clicar no botão "Avaliações" 

    * Resultado :

    * O botão esta sem função 

    * 10 cliques foram feitos  

    * nada aconteceu 

## 5. Análise dos Resultados

* Quantos testes foram executados?

* Foram executados 7 casos de teste (CT01 a CT07).

* Quantos passaram? Quantos falharam?

    * Passaram: 4 testes

        * (CT01, CT02, CT03, CT06)

* Falharam: 3 testes

    * (CT04, CT05, CT07)

* **Principais problemas encontrados**

* Os principais problemas identificados durante a execução foram:

    * 🔴 Falha no login com senha inválida (CT04) Mensagem de erro 

    * 🔴 Busca retornando comportamento incorreto (CT05)

        Sistema não apresenta feedback adequado para buscas de tipos de culinaria resultado

        Inconsistência entre o esperado e o exibido

    * 🔴 Funcionalidade de avaliações não implementada (CT07)

        Botão "Avaliações" não responde

        Nenhuma ação é executada após interação

        Indica funcionalidade incompleta ou com erro crítico

## 6. Reflexão no contexto do LocalEats

* **Reflexão no contexto do LocalEats**

    * O plano de testes ajudou a organizar melhor os testes?

        Sim.

        O plano de testes permitiu estruturar a execução de forma organizada, definindo:

        Quais funcionalidades seriam testadas

        Como os testes seriam executados

        Quais resultados eram esperados

        Isso facilitou a identificação de falhas e evitou testes aleatórios.
    
    * Algum problema só foi percebido durante a execução?

        Sim.

        O principal foi:

        O botão "Avaliações" sem funcionalidade (CT07)

        Esse problema só foi identificado durante a execução prática, pois não era evidente apenas analisando o fluxo do sistema.

    * O que melhorariam no processo de testes?

        Algumas melhorias importantes seriam:

        📌 Maior detalhamento dos casos de teste

        → Evitar ambiguidades nos resultados esperados

        📌 Inclusão de mais testes negativos

        → Para validar melhor o comportamento em erros

        📌 Padronização da escrita dos testes

        → Melhorar clareza e profissionalismo

        📌 Execução em diferentes cenários

        → Diferentes usuários, entradas e fluxos

---