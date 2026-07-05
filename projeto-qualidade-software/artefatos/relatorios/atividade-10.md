# Relatório de Modelos de Maturidade - LocalEats

**Integrantes do Grupo:**
* Douglas Santos
* Mauricio T. Welter

---

## 1. Diagnóstico de Maturidade

| Critério | Sim | Parcial | Não |
| :--- | :---: | :---: | :---: |
| Os requisitos são documentados? | 🟢 | | |
| Existe controle de mudanças? | 🟢 | | |
| Há atividades de teste definidas? | 🟢 | | |
| Os defeitos são registrados? | | 🟡 | |
| O processo de desenvolvimento é conhecido por toda a equipe? | 🟢 | | |
| As tarefas são planejadas e acompanhadas regularmente? | | 🟡 | |
| Existe padronização para implementação de funcionalidades? | 🟢 | | |
| Os testes são executados antes da entrega das funcionalidades? | 🟢 | | |
| Há revisão de código ou validação por outro integrante da equipe? | 🟢 | | |
| A equipe utiliza ferramentas para gerenciamento das atividades? | 🟢 | | |
| Os artefatos do projeto são organizados e versionados? | 🟢 | | |
| Existe rastreabilidade entre requisitos e funcionalidades? | | 🟡 | |
| A equipe realiza reuniões ou retrospectivas? | | | 🔴 |
| Existem indicadores ou métricas para acompanhar a qualidade? | | | 🔴 |

**Classificação: Gerenciado (Nível 2)**

**Justificativa:** O projeto LocalEats encontra-se no nível **"Gerenciado" (Nível 2 do CMMI)**. Esta classificação é sustentada pelo estabelecimento de controles essenciais de configuração, como versionamento via Git/GitHub e a adoção de uma padronização básica no fluxo de *Pull Requests*. As atividades são executadas de forma previsível, com validação cruzada entre os integrantes (revisão de código) e garantia de qualidade antes do *deploy* na Vercel. 

No entanto, a equipe reconhece que ainda não atingiu o nível **"Definido" (Nível 3)**. A transição para este estágio superior exigiria uma formalização mais robusta dos processos, a implementação de uma cultura de retrospectivas periódicas e a coleta sistemática de métricas que permitissem uma análise quantitativa da qualidade do software. Atualmente, a priorização da agilidade operacional — necessária para equilibrar as demandas deste PBL com outros projetos acadêmicos intensos — impede o investimento na burocratização necessária para a subida de maturidade.

---

## 2. Identificação de Lacunas

| Lacuna | Impacto |
| :--- | :--- |
| **Ausência de métricas de qualidade** | Dificulta a mensuração objetiva de bugs e o progresso da cobertura de testes. |
| **Falta de registros formais de defeitos** | Torna difícil o histórico de falhas recorrentes para evitar retrabalho. |
| **Ausência de retrospectivas** | Limita a capacidade da equipe de identificar gargalos no processo de trabalho. |

---

## 3. Propostas de Melhoria

| Melhoria | Benefício |
| :--- | :--- |
| **Implementação de SonarQube** | Automatiza a coleta de métricas e identifica débitos técnicos precocemente. |
| **Uso de Issues para Bug Tracking** | Centraliza a identificação e o histórico de correções de defeitos no próprio repositório. |
| **Checklist Pós-Sprint** | Reunião rápida (15min) para listar o que funcionou e o que impediu o progresso no PBL. |