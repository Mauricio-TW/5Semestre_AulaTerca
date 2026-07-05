# Relatório de Qualidade em Metodologias Ágeis - LocalEats

**Integrantes do Grupo:**
* Douglas Santos
* Mauricio T. Welter

---

## 1. Análise de Práticas Ágeis no Processo

| Prática | Existe? | Como é aplicada atualmente? | Pode ser melhorada? |
| :--- | :---: | :--- | :--- |
| **Planejamento iterativo** | Sim | Realizado por ciclos baseados nos prazos do PBL. | Sim, com Sprints mais curtas. |
| **Priorização de funcionalidades** | Sim | Focamos no que é essencial para o MVP. | Sim, usando MoSCoW. |
| **Entregas incrementais** | Sim | Deploy contínuo via Vercel a cada nova funcionalidade. | Sim, com releases versionadas. |
| **Feedback frequente** | Sim | Validações informais durante a construção. | Sim, com reuniões de review. |
| **Trabalho colaborativo** | Sim | *Pair programming* e revisões de código (PRs). | Sim, com mais *Dailies*. |
| **Controle visual** | Sim | Uso de *Issues* e *Projects* no GitHub. | Sim, automatizando o fluxo. |
| **Melhoria contínua** | Parcial | Refatorações conforme detectamos falhas. | Sim, com retrospectivas. |

**Conclusão:** 
Nosso processo atual é funcional e ágil, fortemente apoiado pela infraestrutura do GitHub e Vercel. O maior ponto forte é a cultura de revisão entre pares, que garante qualidade técnica. A principal oportunidade de melhoria reside na formalização dos rituais ágeis (como retrospectivas e dailies) e na estruturação de critérios de aceite (DoR/DoD), que reduzirão o retrabalho causado por ambiguidades nos requisitos.

---

## 2. Propostas de Melhoria Ágil

| Melhoria Proposta | Metodologia | Benefício Esperado |
| :--- | :--- | :--- |
| **Implementar Sprints semanais** | Scrum | Melhor cadência e foco em metas curtas. |
| **Uso da técnica MoSCoW** | Lean/Agile | Priorização clara do que é vital vs. desejável. |
| **Realizar Retrospectivas** | Scrum | Identificação rápida de impedimentos no processo. |
| **Automação de Lint/Testes** | XP (Extreme Prog.) | Redução de erros humanos antes do merge. |

---

## 3. Definition of Ready (DoR)
*Critérios para uma tarefa entrar em desenvolvimento:*
1. O requisito possui um título claro e descrição do problema.
2. Os critérios de aceitação estão documentados na Issue.
3. Não há dependências técnicas bloqueantes conhecidas.
4. O esforço estimado foi discutido e validado pela dupla.
5. As interfaces ou mocks necessários foram definidos.

---

## 4. Definition of Done (DoD)
*Critérios para considerar uma funcionalidade concluída:*
1. O código foi revisado e aprovado via *Pull Request*.
2. Os testes automatizados (unitários) foram executados com sucesso.
3. A funcionalidade foi testada no ambiente de desenvolvimento/staging.
4. Não há débito técnico crítico pendente na implementação.
5. A documentação (se necessária) foi atualizada.