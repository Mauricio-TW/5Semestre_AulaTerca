# Relatório da Atividade 12: Integração Contínua (CI)

## 1. Introdução
Este relatório documenta a implementação de um pipeline de Integração Contínua (CI) no repositório `5Semestre_AulaTerca`, especificamente para o projeto contido na pasta `projeto-qualidade-software/atividade 12`. O objetivo foi automatizar a execução de testes a cada alteração no código principal (`main`).

## 2. Configuração do Pipeline
Para a implementação, foi utilizada a plataforma **GitHub Actions**. A configuração foi realizada no arquivo `.github/workflows/ci.yml` na raiz do repositório.

### Detalhes da Configuração:
*   **Triggers:** O pipeline é disparado automaticamente a cada `push` na branch `main`.
*   **Ambiente:** Utiliza-se um runner `ubuntu-latest`.
*   **Diretório de Trabalho:** Devido à estrutura do repositório, o pipeline foi configurado para executar os comandos dentro do diretório `./projeto-qualidade-software/atividade 12`.
*   **Versão do Node.js:** O pipeline utiliza a versão 22 para garantir compatibilidade com as políticas atuais do GitHub.

```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./projeto-qualidade-software/atividade 12
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
    - name: Install dependencies
      run: npm install --no-package-lock
    - name: Run tests
      run: npm test