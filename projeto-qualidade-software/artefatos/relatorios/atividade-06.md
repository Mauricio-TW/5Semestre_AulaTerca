# Atividade PBL – Aula 9: Testes Unitários Automatizados e TDD – LocalEats

**Grupo:** Mauricio T. Welter, Douglas Santos  
**Disciplina:** Qualidade de Software  
**Professor:** Luciano Zanuz  
**Data:** 25/05/2026  

## 1. Funcionalidade Escolhida

* **Regra de Negócio:** Cálculo do total do pedido com validação de valor mínimo.
* **Contexto e Origem:** Dando continuidade ao cenário de checkout avaliado no **CT06** do nosso plano de testes anterior (Aula 6), isolamos a regra de negócio do ecossistema de backend responsável por processar e validar as condições financeiras antes de autorizar o fechamento do carrinho de compras.
* **O que faz:** Soma os valores de todos os itens selecionados e adicionados ao carrinho pelo usuário e verifica se o somatório atinge o valor mínimo de pedido estabelecido pelas políticas comerciais do restaurante parceiro.
* **Problema que resolve:** Atende diretamente à meta de evolução e melhoria apontada pelo grupo no relatório anterior (maior inclusão de testes negativos para validar o comportamento em erros). O algoritmo impede de forma automatizada o processamento e o envio de pedidos que violam o ticket mínimo do restaurante, evitando prejuízos com custos operacionais de entrega para valores baixos.
* **Importância:** Trata-se de uma regra de domínio crítica para a sustentabilidade financeira da plataforma LocalEats e para a manutenção de um relacionamento saudável e confiável com a associação de lojistas independentes.

## 2. Testes Unitários

Abaixo estão especificados e codificados os três cenários obrigatórios de testes unitários desenvolvidos para validar o comportamento da regra de negócio central de fechamento de pedidos, utilizando TypeScript e a sintaxe do framework Jest.

### Cenário 1: Sucesso - Pedido com valor acima do mínimo exigido (Happy Path 1)

* **Nome descritivo:** `should calculate the total order price correctly when it exceeds the minimum value`
* **Cenário testado:** Valida se a função realiza o somatório correto de múltiplos itens enviados e retorna o valor consolidado esperado quando essa soma ultrapassa com segurança o valor limite mínimo configurado.
* **Dados de entrada:**
  * `items = [{ name: 'Hambúrguer Artesanal', price: 35.00 }, { name: 'Batata Frita', price: 15.00 }]`
  * `minimumValue = 30.00`
* **Resultado esperado:** Retornar o valor numérico exato de `50.00` e não disparar nenhuma exceção.

```typescript
it('should calculate the total order price correctly when it exceeds the minimum value', () => {
  // Arrange (Preparação)
  const items = [
    { name: 'Hambúrguer Artesanal', price: 35.00 },
    { name: 'Batata Frita', price: 15.00 }
  ];
  const minimumValue = 30.00;

  // Act (Execução)
  const result = calculateOrderTotal(items, minimumValue);

  // Assert (Validação)
  expect(result).toBe(50.00);
});
```
### Cenário 2: Sucesso - Pedido com valor exatamente igual ao mínimo exigido (Happy Path 2 / Fronteira)

* **Nome descritivo:** `should allow the order when the total price is exactly equal to the minimum value`
* **Cenário testado:** Garante que o limite inferior inclusivo estabelecido pela regra de negócio é respeitado pelo sistema, aceitando pedidos cujo somatório seja idêntico ao valor mínimo configurado.
* **Dados de entrada:**
  * `items = [{ name: 'Pizza Brotinho', price: 25.00 }]`
  * `minimumValue = 25.00`
* **Resultado esperado:** Retornar o valor numérico exato de `25.00` e permitir o fluxo sem lançar erros.

```typescript
it('should allow the order when the total price is exactly equal to the minimum value', () => {
  // Arrange (Preparação)
  const items = [
    { name: 'Pizza Brotinho', price: 25.00 }
  ];
  const minimumValue = 25.00;

  // Act (Execução)
  const result = calculateOrderTotal(items, minimumValue);

  // Assert (Validação)
  expect(result).toBe(25.00);
});
```
### Cenário 3: Erro - Pedido abaixo do valor mínimo exigido (Cenário de Erro / Teste Negativo)

* **Nome descritivo:** `should throw an error when the total order price is below the minimum value`
* **Cenário testado:** Valida se o sistema bloqueia a transação de forma robusta e lança uma exceção de negócio quando o carrinho do cliente não atinge o ticket mínimo.
* **Dados de entrada:**
  * `items = [{ name: 'Refrigerante Lata', price: 7.00 }]`
  * `minimumValue = 15.00`
* **Resultado esperado:** Lançar uma exceção de erro contendo a mensagem exata: `"Valor mínimo do pedido não atingido"`.

```typescript
it('should throw an error when the total order price is below the minimum value', () => {
  // Arrange (Preparação)
  const items = [
    { name: 'Refrigerante Lata', price: 7.00 }
  ];
  const minimumValue = 15.00;

  // Act & Assert (Execução e Validação)
  expect(() => {
    calculateOrderTotal(items, minimumValue);
  }).toThrow('Valor mínimo do pedido não atingido');
});
```

## 3. Aplicação do TDD (Test-Driven Development)

Abaixo está documentada a evolução sequencial da funcionalidade através das três fases obrigatórias do ciclo clássico do desenvolvimento guiado por testes.

### Fase 1: RED (Escrever o teste que falha)

Antes de construir qualquer inteligência algorítmica ou lógica estruturada, criamos apenas a assinatura da função e definimos um retorno estático inválido (`0`). Isso garante e comprova que a nossa suite de testes configurada no Jest está ativa, funcional e interceptando os comportamentos incorretos conforme planejado.

**Código de Produção Inicial (`calculate-order-total.ts`):**

```typescript
export interface Item {
  name: string;
  price: number;
}

export function calculateOrderTotal(items: Item[], minimumValue: number): number {
  // Retorno mockado padrão para forçar a falha dos testes de sucesso (Estado RED)
  return 0;
}
```
### Fase 2: GREEN (Implementar o código mínimo para passar)

Escrevemos o algoritmo mais direto, simples e bruto possível, utilizando uma estrutura tradicional de repetição `for`. O foco absoluto desta etapa é codificar estritamente o necessário para fazer com que os testes unitários mapeados saiam do estado de falha e atinjam o estado verde (aprovados).

**Código de Produção Corrigido (`calculate-order-total.ts`):**

```typescript
export function calculateOrderTotal(items: Item[], minimumValue: number): number {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }

  if (total < minimumValue) {
    throw new Error('Valor mínimo do pedido não atingido');
  }

  return total;
}
```
### Fase 3: REFACTOR (Melhorar o código com segurança)

Com a suite de testes cobrindo todas as regras com sucesso, aplicamos os padrões modernos de Clean Code para eliminar a estrutura imperativa do loop e adotar uma abordagem funcional elegante. O objetivo é otimizar a legibilidade e manutenibilidade do arquivo, tendo a garantia de que o comportamento validado permanece intacto.

**Código de Produção Final Refatorado (`calculate-order-total.ts`):**

```typescript
export interface Item {
  name: string;
  price: number;
}

/**
 * Calcula o valor total do pedido e valida contra o limite mínimo do restaurante.
 * @param items Lista de itens adicionados ao carrinho
 * @param minimumValue Valor mínimo exigido pelo restaurante parceiro
 * @returns O valor total calculado do pedido
 * @throws {Error} Se o valor total obtido for inferior ao ticket mínimo estabelecido
 */
export function calculateOrderTotal(items: Item[], minimumValue: number): number {
  const totalOrderPrice = items.reduce((accumulator, item) => accumulator + item.price, 0);

  if (totalOrderPrice < minimumValue) {
    throw new Error('Valor mínimo do pedido não atingido');
  }

  return totalOrderPrice;
}
```

## 4. Refatoração

* **O que foi melhorado:**
  1. **Substituição de Estrutura:** Troca do loop imperativo `for` clássico pelo método funcional acumulador nativo `items.reduce()`.
  2. **Expressividade das Variáveis:** Alteração do nome da variável interna de `total` para `totalOrderPrice`, alinhando o código com os princípios de código limpo.
  3. **Documentação de Escopo:** Inclusão de comentário descritivo (JSDoc) detalhando os parâmetros da função e o comportamento de lançamento de exceções.
* **Justificativa:** A eliminação de loops manuais reduz o risco de erros de indexação e melhora a manutenibilidade do código no ecossistema do backend, sem alterar os resultados esperados já consolidados pelos testes.

## 5. Execução dos Testes

### Relatório Estatístico do Console
* **Total de Casos de Teste:** 3
* **Testes Aprovados (Passed):** 3
* **Testes Reprovados (Failed):** 0

### Evidência de Execução (Log do Terminal do Framework Jest)

```bash
PASS  src/domain/checkout/calculate-order-total.spec.ts
  Calculate Order Total (Unit Tests)
    ✓ should calculate the total order price correctly when it exceeds the minimum value (2 ms)
    ✓ should allow the order when the total price is exactly equal to the minimum value (0 ms)
    ✓ should throw an error when the total order price is below the minimum value (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.842 s, estimated 1 s
Ran all test suites.
```

## 6. Reflexão no Contexto do LocalEats

* **Foi difícil escrever testes antes do código?**
  Sim, quebrar o hábito de escrever o código de produção primeiro gerou um estranhamento inicial. Porém, focar na especificação do comportamento antes de programar ajudou a delimitar o escopo exato da função.

* **O TDD ajudou no desenvolvimento?**
  Substancialmente. Ao definir os critérios de aceitação e os limites de borda antes da codificação, o processo de desenvolvimento da regra de negócio tornou-se rápido, assertivo e livre de ambiguidades.

* **Os testes aumentaram a confiança no código?**
  Com certeza. A maior vantagem ocorreu na fase de refatoração. Modificar a estrutura interna da lógica mudando para o `.reduce()` sem o receio de quebrar o comportamento trouxe total segurança contra regressões.

* **O que melhorariam?**
  Como evolução para o projeto LocalEats, uma melhoria seria integrar esses testes diretamente a classes de exceção personalizadas do framework de backend (como `BadRequestException`), gerando mensagens de erro HTTP mais padronizadas para a API.

* **Como isso ajuda no projeto do grupo?**
  A introdução do TDD blinda o motor de regras de negócio do LocalEats. À medida que o grupo evoluir o sistema adicionando taxas de entrega ou cupons de desconto, a execução automática dos testes garante que nenhuma alteração nova quebre os fluxos que já estão funcionando.