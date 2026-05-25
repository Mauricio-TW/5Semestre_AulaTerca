# Diagnóstico de Qualidade e Estrutura Organizacional — Startup Local Eats

**Grupo:** Mauticio T Welter, Douglas Santos
**Disciplina:** Qualidade de Software  
**Data:** 17/03/2026

## 1. Diagnóstico da Situação Atual
A Local Eats apresenta um cenário de baixa maturidade em processos de software. A ocorrência de pedidos duplicados e falhas em produção indica que não há uma etapa de validação independente.

* **Papéis Prováveis:** Atualmente, a equipe deve contar apenas com Desenvolvedores e talvez um Analista de Sistemas/PO. A falta de um olhar focado em QA faz com que o desenvolvedor teste o próprio código, o que gera "vício de visão".
* **Responsável Atual:** A responsabilidade está diluída. Sem um processo definido, a qualidade acaba sendo reativa (corrigir após o erro aparecer para o cliente).
* **Riscos Identificados:** Perda de receita por pedidos duplicados e danos à reputação da marca devido à instabilidade do app.
* **Cultura de Qualidade:** A qualidade deve ser entendida como uma **responsabilidade compartilhada**. O QA guia o processo, mas o desenvolvedor é responsável pela entrega de um código testável e o PO pela clareza dos requisitos.

## 2. Proposta de Organização da Qualidade

### 2.1. Definição de Papéis
| Papel | Responsabilidades Principais | Relação com a Qualidade |
| :--- | :--- | :--- |
| **QA / Analista de Qualidade** | Planejar cenários de teste, reportar bugs e validar correções. | Guardião da experiência do usuário e dos critérios de aceite. |
| **Desenvolvedor** | Implementar funções, realizar testes unitários e revisões de código. | Garante a integridade técnica e funcional da aplicação. |
| **Product Owner (PO)** | Definir requisitos claros e critérios de pronto (DoD). | Garante que o software entregue o valor esperado pelo negócio. |
| **DevOps** | Automatizar o fluxo de deploy e monitorar logs de erro. | Garante a estabilidade do ambiente onde o software roda. |

### 2.2. Responsabilidades de Qualidade
1. **Revisão de Requisitos (PO e QA):** Validar se o que foi pedido é testável e faz sentido para o negócio.
2. **Testes Unitários (Desenvolvedores):** Validar a menor unidade de código antes de enviar para o QA.
3. **Testes de Integração (QA):** Garantir que a comunicação entre Web, Mobile e Banco de Dados está correta.
4. **Testes de Aceite (PO):** Validar a entrega final antes de liberar para os restaurantes.

## 3. Práticas de QA Recomendadas
1. **Gestão de Defeitos:** Centralizar todos os erros encontrados no GitHub Issues para acompanhamento do ciclo de vida do bug.
2. **Testes de Fumaça (Smoke Tests):** Validar o fluxo principal (Pedido -> Pagamento) a cada atualização de sistema.
3. **Critérios de Aceite (DoD):** Definir que uma tarefa só está "Pronta" se possuir evidências de testes bem-sucedidos.
4. **Testes Exploratórios:** Sessões livres de teste para encontrar comportamentos inesperados que fogem dos roteiros tradicionais.

## 4. Anúncios de Contratação

### Vaga 01: Analista de Qualidade (QA)
* **Sobre a vaga:** A Local Eats busca um QA para estruturar nossos processos de testes e garantir a melhor experiência de delivery da cidade.
* **Responsabilidades:** Criar planos de teste, identificar riscos de software e apoiar a equipe na melhoria contínua.
* **Requisitos Obrigatórios:** Conhecimento em técnicas de teste; Boa comunicação; Experiência com Git.
* **Desejáveis:** Certificação ISTQB-CTFL; Noções de automação (Cypress ou Selenium).

### Vaga 02: Desenvolvedor Full Stack
* **Sobre a vaga:** Atuará no desenvolvimento e sustentação da plataforma com foco em código limpo e robusto.
* **Responsabilidades:** Desenvolver novas features; Escrever testes unitários e participar de revisões de código.
* **Requisitos Obrigatórios:** Experiência com JavaScript/TypeScript; Conhecimento em bancos de dados relacionais.
* **Desejáveis:** Experiência com metodologias ágeis (Scrum/Kanban).

---
**Equipe de Consultoria:**
- Mauricio T. Welter
- Douglas Santos
- Leandro Mandela