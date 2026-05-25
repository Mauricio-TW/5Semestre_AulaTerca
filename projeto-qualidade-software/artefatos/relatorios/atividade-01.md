# Atividade 01: Diagnóstico de Qualidade — Projeto Local Eats

**Grupo:** Mauticio T Welter, Douglas Santos
**Disciplina:** Qualidade de Software  
**Data:** 10/03/2026

## 1. Objetivo da Análise
Realizar um diagnóstico inicial da plataforma Local Eats, identificando falhas críticas de software e relacionando-as aos atributos de qualidade da norma **ISO/IEC 25010**.

## 2. Relatório de Problemas e Atributos Afetados

| Problema Identificado | Atributo de Qualidade Afetado (ISO 25010) | Justificativa Técnica | Impacto para o Negócio/Usuário |
| :--- | :--- | :--- | :--- |
| **Lentidão em horários de pico** | **Eficiência de Desempenho** (Comportamento Temporal) | O sistema não possui escalabilidade para lidar com o aumento de requisições simultâneas. | Gera frustração e abandono da plataforma no momento de maior potencial de venda. |
| **Buscas retornam resultados incorretos** | **Adequação Funcional** (Correção Funcional) | O software falha em processar as regras de negócio de busca (filtro por culinária/local). | Perda de credibilidade; o usuário não encontra o que precisa. |
| **Avaliações desaparecem após o refresh** | **Fiabilidade** (Tolerância a Falhas / Integridade) | Falha na persistência dos dados ou dessincronização entre o banco de dados e o front-end. | Insegurança sobre a confiabilidade das informações da plataforma. |
| **Falhas em modelos específicos de smartphone** | **Compatibilidade** (Adaptabilidade) | O sistema não foi validado para diferentes arquiteturas de hardware ou versões de SO. | Exclusão de parte da base de usuários e avaliações negativas nas lojas de apps. |
| **Telas confusas e ações difíceis de concluir** | **Usabilidade** (Operabilidade / Apreensibilidade) | A interface não é intuitiva e falha em guiar o usuário em tarefas básicas. | Aumento do suporte técnico e baixa taxa de conversão (pedidos/reservas). |
| **Inconsistências entre Web e Mobile** | **Compatibilidade** (Interoperabilidade / Coexistência) | Diferença de comportamento entre plataformas indica falta de padronização no desenvolvimento. | Dificulta o aprendizado e a fidelização do usuário. |

## 3. Conclusão Técnica

### O sistema possui qualidade adequada para continuar em operação?
**Não.** Do ponto de vista de Engenharia de Software, o produto possui "dívidas técnicas" graves. Operar um sistema que apresenta resultados incorretos e perda de dados (avaliações) compromete a confiança da associação de comerciantes.

### Priorização sugerida:
1.  **Crítica (Imediata):** Correção das buscas e persistência das avaliações (Core Business).
2.  **Alta:** Otimização de performance para picos de acesso (Disponibilidade).
3.  **Média:** Padronização da interface (UX) e correções de compatibilidade mobile.

---
**Equipe de Qualidade:**
- Mauricio T. Welter
- Douglas Santos
- Leandro Mandela

