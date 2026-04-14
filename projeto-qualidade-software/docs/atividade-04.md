# Atividade PBL – Aula 5: Testes Funcionais vs Estruturais – LocalEats

**Grupo:** Mauticio T Welter, Douglas Santos, Leandro Mandela
**Disciplina:** Qualidade de Software  
**Data:** 14/04/2026

---

## 1. Escolha da Funcionalidade: Busca de Restaurantes

* **O que a funcionalidade faz:** Permite que o utilizador pesquise estabelecimentos através de um campo de texto, utilizando termos como nome do restaurante ou tipo de gastronomia (ex: "Pizza", "Hambúrguer", "Japonesa").
* **O que o usuário espera dela:** Espera-se que o sistema retorne resultados precisos e relevantes em tempo real, filtrando estabelecimentos ativos e que correspondam ao termo pesquisado, preferencialmente ordenados por proximidade ou avaliação.

---

## 2. Testes Caixa-Preta (Visão do Usuário)

Nesta abordagem, testamos a funcionalidade através da interface, sem conhecimento do código interno.

* **Entradas possíveis:**
    * Nomes exatos de restaurantes.
    * Categorias de comida (ex: "Vegano").
    * Buscas com caracteres especiais ou emojis.
    * Campo de busca vazio.
* **Comportamentos esperados:**
    * Exibição de uma lista de cards com as informações básicas do restaurante.
    * Mensagem de "Nenhum resultado encontrado" para termos inexistentes.
* **Situações de erro/Cenários de falha:**
    * O sistema não responde ao clicar no botão de pesquisa.
    * A busca diferencia maiúsculas de minúsculas (ex: "PIZZA" não traz resultados, mas "pizza" sim).
    * Exibição de resultados que não condizem com o termo pesquisado.

---

## 3. Testes Caixa-Branca (Visão do Sistema)

Aqui, analisamos a lógica interna da aplicação (Backend em NestJS/Node.js).

* **Possíveis estruturas lógicas e regras:**
    * **Validação de DTO:** Regras que impedem que a query de busca chegue ao banco de dados se for vazia ou perigosa.
    * **Lógica do Service:** Implementação de funções de tratamento de string (ex: `.toLowerCase()` e `.trim()`) antes de executar a consulta.
    * **Query de Banco de Dados:** Uso de operadores como `LIKE` ou `ILIKE` para busca parcial de nomes.
* **Situações que precisam ser testadas no código:**
    * Verificar se o código trata corretamente o retorno de um array vazio do banco de dados para evitar erros de renderização.
    * Testar se a lógica de paginação (limit/offset) está a funcionar para não sobrecarregar o sistema com muitos resultados.
    * Garantir que a consulta ao banco de dados filtra apenas registros com a flag `is_active: true`.

---

## 4. Comparação entre as abordagens

* **Principal Diferença:**
    A principal diferença é a **perspetiva de análise**. O teste de **Caixa-Preta** foca no comportamento externo e na experiência do utilizador (o "quê" o sistema faz), enquanto o teste de **Caixa-Branca** foca na integridade do código, fluxos lógicos e segurança (o "como" o sistema faz).

* **Tipos de problema encontrados:**
    * **Caixa-Preta:** Ideal para encontrar erros de usabilidade, falhas em requisitos de negócio e problemas de interface (front-end).
    * **Caixa-Branca:** Fundamental para identificar "código morto", vulnerabilidades (como SQL Injection), erros de performance em queries e caminhos de exceção não tratados no backend.

---

## 5. Reflexão no contexto do LocalEats

No cenário atual do **LocalEats**, onde o sistema apresenta resultados incorretos e comportamentos inesperados, a abordagem de **Caixa-Branca** demonstra-se mais urgente. Estes sintomas indicam falhas na lógica de filtragem, na construção das queries ou no tratamento de dados dentro dos Services da aplicação.

Contudo, **apenas uma abordagem não é suficiente**. Para atingir a qualidade total, é necessário o equilíbrio: os testes de Caixa-Branca garantem que o "motor" (backend) está robusto e livre de erros lógicos, enquanto os testes de Caixa-Preta asseguram que o utilizador final consegue, de facto, utilizar a funcionalidade de forma fluida e intuitiva através da interface.

---