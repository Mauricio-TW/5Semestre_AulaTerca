
# Estratégia Inicial de Testes — LocalEats

**Grupo:** Mauticio T Welter, Douglas Santos
**Disciplina:** Qualidade de Software  
**Data:** 24/03/2026

## 1. Funcionalidades Principais
Para estabilizar a plataforma, focaremos no "Caminho Crítico" do usuário:
1. **Busca e Filtro:** Localização, culinária e preço.
2. **Visualização de Cardápio e Avaliações:** Exibição correta de fotos e textos.
3. **Gerenciamento de Favoritos:** Salvar e recuperar locais.
4. **Fluxo de Checkout/Pedido:** Finalização da escolha do prato.
5. **Sincronização Web/Mobile:** Paridade de dados entre dispositivos.

## 2. Níveis de Teste
Aplicaremos os níveis de forma encadeada para isolar os erros relatados:

* **Teste Unitário:**
    * *O que:* Validar funções de cálculo de frete, regras de filtros de busca e formatação de preços.
    * *Por quê:* É a camada mais barata e rápida. Resolve na raiz os "resultados incorretos" nas buscas antes de chegarem à interface.
* **Teste de Integração:**
    * *O que:* Comunicação entre o App/Web e a API de avaliações e banco de dados.
    * *Por quê:* Resolve o problema das "avaliações que desaparecem". Precisamos garantir que o dado enviado pelo front-end foi persistido com sucesso no back-end.
* **Teste de Sistema:**
    * *O que:* O fluxo completo de "Buscar -> Escolher -> Pedir" em diversos modelos de smartphones.
    * *Por quê:* Ataca diretamente as "falhas em determinados modelos" e a "dificuldade em concluir ações simples", validando o software como um todo.
* **Teste de Aceitação:**
    * *O que:* Validação com lojistas da associação para confirmar se o fluxo de recebimento de pedidos está correto.
    * *Por quê:* Garante que o sistema atende à necessidade real da associação, evitando a insatisfação dos comerciantes.

## 3. Prioridades e Riscos
| Funcionalidade | Prioridade | Risco/Impacto | Justificativa |
| :--- | :--- | :--- | :--- |
| **Busca e Filtro** | **Crítica** | Alto (Abandono) | Se a busca falha, o usuário não encontra o produto e sai do app imediatamente. |
| **Persistência de Avaliações** | **Alta** | Médio (Reputação) | O sumiço de dados gera sensação de sistema instável e pouco confiável. |
| **Finalização de Pedido** | **Crítica** | Alto (Financeiro) | É onde o dinheiro entra. Erros aqui impedem a receita da startup e dos lojistas. |

## 4. Pirâmide de Testes
Nossa estratégia seguirá a **Pirâmide de Testes clássica**:
1.  **Base (Maior quantidade):** Testes Unitários. São rápidos de executar e detectam erros de lógica (como filtros de busca errados) instantaneamente.
2.  **Meio (Quantidade moderada):** Testes de Integração/API. Essenciais para garantir que a versão Web e Mobile recebam os mesmos dados.
3.  **Topo (Menor quantidade):** Testes de UI/E2E (Ponta a ponta). São caros e lentos. Focaremos apenas nos fluxos críticos (checkout), pois são os que mais quebram em diferentes smartphones.

**Justificativa:** Investir na base reduz o custo de manutenção e garante um feedback rápido para os desenvolvedores, deixando os testes manuais/UI apenas para o que é visualmente crítico.

## 5. Testes em Produção
**Sim, o sistema deve utilizar testes em produção de forma controlada.**

* **Situação:** Monitoramento de Performance (APM) e Testes de "Canary Release" (liberar para 5% dos usuários primeiro).
* **Justificativa:** Como o sistema sofre com "lentidão em horários de pico", precisamos de telemetria em tempo real para identificar gargalos que não aparecem em ambiente de teste. O uso de *Feature Flags* permitiria desativar funções pesadas (como recomendações personalizadas) caso o servidor comece a travar durante o evento gastronômico.

---
**Equipe de QA:**
- Mauricio T. Welter
- Douglas Santos
- Leandro Mandela