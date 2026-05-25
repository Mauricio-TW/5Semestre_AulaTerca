# Atividade PBL – Aula 10: Testes Funcionais Automatizados (E2E) – LocalEats

**Grupo:** Mauricio T. Welter, Douglas Santos  
**Disciplina:** Qualidade de Software  
**Professor:** Luciano Zanuz  
**Data:** 25/05/2026  

# 1. Fluxos Funcionais Escolhidos

## Fluxo 1: Login de Usuário (Responsável: Mauricio T. Welter)

* **O que faz:** Permite autenticar um cliente na plataforma através de e-mail e senha.
* **Problema que resolve:** Garante o controle de acesso seguro e a identificação do usuário nas etapas seguintes.
* **Importância:** É o fluxo crítico de entrada; se falhar, bloqueia a conversão e o uso de recursos personalizados.

## Fluxo 2: Fluxo de Pedido / Checkout (Responsável: Douglas Santos)

* **O que faz:** Finaliza a compra dos itens adicionados ao carrinho, validando o fechamento do pedido.
* **Problema que resolve:** Automatiza a validação da principal esteira de receita da plataforma (geração de pedidos).
* **Importância:** Trata-se do fluxo mais crítico de negócio; falhas aqui geram impacto financeiro direto e abandono de carrinho.

# 2. Testes Automatizados com Codegen

Os fluxos iniciais foram gravados utilizando a ferramenta de geração automática de código do Playwright através do comando terminal:

```bash
playwright codegen https://local-eats-unisenac.vercel.app/
```

## Código Bruto Gerado (Exemplo de Interação)

```python
from playwright.sync_api import Playwright, sync_playwright, expect

def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto("https://local-eats-unisenac.vercel.app/")
    page.get_by_role("button", name="Entrar / Login").click()
    page.get_by_placeholder("Digite seu e-mail").fill("mauricio@teste.com")
    page.get_by_placeholder("Digite sua senha").fill("Senha123!")
    page.locator("form button").click()

    page.get_by_role("link", name="Carrinho").click()
    page.get_by_role("button", name="Finalizar Compra").click()

    context.close()
    browser.close()
```

## Observações Iniciais do Codegen

### O que o Codegen fez bem?

Mapeou as coordenadas de navegação iniciais de forma extremamente rápida, estruturando a sequência cronológica de cliques e preenchimentos de inputs sem que precisássemos inspecionar o DOM manualmente elemento por elemento.

### O que gerou código desnecessário/frágil?

Utilizou seletores genéricos baseados na árvore estrutural do elemento HTML (como `locator("form button")`), além de poluir o arquivo com o gerenciamento manual de abertura e fechamento de contextos do browser (`new_context`), algo que o próprio framework de testes Pytest já gerencia nativamente de forma mais limpa.

# 3. Implementação do Teste com Pytest

Criamos uma suite estruturada onde os dois fluxos funcionais de ponta a ponta são declarados de maneira limpa utilizando o Pytest, injetando o fixture nativo `page` e aplicando as asserções de validação recomendadas.

## Código de Produção (`tests/test_fluxos_localeats.py`)

```python
import pytest
from playwright.sync_api import Page, expect


def test_deve_realizar_login_com_sucesso(page: Page):
    # Execução do fluxo de login
    page.goto("https://local-eats-unisenac.vercel.app/")

    page.get_by_role("button", name="Entrar / Login").click()
    page.get_by_placeholder("Digite seu e-mail").fill("mauricio@teste.com")
    page.get_by_placeholder("Digite sua senha").fill("Senha123!")
    page.get_by_role("button", name="Autenticar").click()

    # Assertions relevantes de sucesso
    expect(page.get_by_text("Bem-vindo, Mauricio")).to_be_visible()


def test_deve_finalizar_checkout_com_sucesso(page: Page):
    # Execução do fluxo de checkout
    page.goto("https://local-eats-unisenac.vercel.app/")

    page.get_by_role("link", name="Carrinho").click()
    page.get_by_role("button", name="Finalizar Compra").click()

    # Assertions relevantes de sucesso
    expect(page.get_by_text("Pedido realizado com sucesso!")).to_be_visible()
```

# 4. Refatoração com Page Object Model (POM)

Refatoramos a suíte de testes aplicando o padrão de arquitetura **Page Object Model (POM)** para desacoplar a lógica dos testes funcionais dos seletores de elementos da interface gráfica, mitigando os riscos de fragilidade e alta manutenção no frontend do LocalEats.

## Estrutura de Diretórios Criada

```text
pages/
├── login_page.py
├── checkout_page.py
tests/
└── test_localeats_pom.py
```

## Arquivo `pages/login_page.py`

```python
from playwright.sync_api import Page


class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.url = "https://local-eats-unisenac.vercel.app/"

        self.botao_abrir_login = page.get_by_role(
            "button",
            name="Entrar / Login"
        )

        self.input_email = page.get_by_placeholder(
            "Digite seu e-mail"
        )

        self.input_senha = page.get_by_placeholder(
            "Digite sua senha"
        )

        self.botao_enviar = page.get_by_role(
            "button",
            name="Autenticar"
        )

    def acessar(self):
        self.page.goto(self.url)

    def logar(self, email, senha):
        self.botao_abrir_login.click()
        self.input_email.fill(email)
        self.input_senha.fill(senha)
        self.botao_enviar.click()
```

## Arquivo `pages/checkout_page.py`

```python
from playwright.sync_api import Page


class CheckoutPage:
    def __init__(self, page: Page):
        self.page = page

        self.botao_carrinho = page.get_by_role(
            "link",
            name="Carrinho"
        )

        self.botao_finalizar = page.get_by_role(
            "button",
            name="Finalizar Compra"
        )

        self.mensagem_sucesso = page.get_by_text(
            "Pedido realizado com sucesso!"
        )

    def prosseguir_para_checkout(self):
        self.botao_carrinho.click()
        self.botao_finalizar.click()
```

## Arquivo `tests/test_localeats_pom.py`

```python
import pytest
from playwright.sync_api import Page, expect

from pages.login_page import LoginPage
from pages.checkout_page import CheckoutPage


def test_fluxo_login_com_pom(page: Page):
    login = LoginPage(page)

    login.acessar()
    login.logar(
        "mauricio@teste.com",
        "Senha123!"
    )

    # Validação do fluxo de autenticação
    expect(
        page.get_by_text("Bem-vindo, Mauricio")
    ).to_be_visible()


def test_fluxo_checkout_com_pom(page: Page):
    login = LoginPage(page)
    checkout = CheckoutPage(page)

    # Setup do estado inicial
    login.acessar()
    login.logar(
        "mauricio@teste.com",
        "Senha123!"
    )

    # Execução do fluxo de checkout
    checkout.prosseguir_para_checkout()

    # Validação final
    expect(
        checkout.mensagem_sucesso
    ).to_be_visible()
```

# 5. Execução dos Testes

Executamos a suite de testes ponta a ponta utilizando o Pytest integrado ao Playwright para validar a estabilidade dos fluxos sob o padrão POM.

## Relatório Estatístico

* **Total de testes executados:** 2
* **Quantos passaram:** 2
* **Quantos falharam:** 0

## Evidência de Execução (Log do Terminal)

```bash
============================= test session starts =============================
platform linux -- Python 3.11.5, pytest-7.4.2, pluggy-1.3.0
rootdir: /home/mauricio/workspace/local-eats-tests
plugins: playwright-1.38.0, base-url-2.0.0
collected 2 items

tests/test_localeats_pom.py ..                                          [100%]

============================== 2 passed in 4.51s ==============================
```

# 6. Análise Crítica dos Testes

## O teste quebrou em algum momento? Por quê?

Sim, durante as execuções iniciais em modo com interface gráfica (*headed*), o teste do checkout quebrou porque tentou interagir com o botão de finalização antes que a animação de carregamento e transição do carrinho terminasse na tela. Corrigimos isso estruturando seletores acoplados ao mecanismo de auto-waiting nativo do Playwright.

## Quais seletores foram mais difíceis?

Os botões e elementos dinâmicos que não possuíam IDs fixos ou atributos semânticos dedicados. Depender de textos brutos como `"Entrar / Login"` gerou falhas intermitentes até padronizarmos a busca via acessibilidade com o método `get_by_role`.

## O Codegen ajudou ou gerou problemas?

Ajudou no pontapé inicial para mapear a sequência cronológica das ações e os nomes de campos textuais. No entanto, gerou problemas estruturais por criar seletores genéricos e acoplados demais à árvore estrutural do HTML (`locator("form button")`), o que exigiu refatoração imediata.

## O teste é confiável? Por quê?

Sim. A aplicação do modelo POM isolou a folha de seletores, e o Playwright aguarda nativamente que os elementos fiquem interativos antes de realizar qualquer ação, reduzindo drasticamente falsos negativos causados por oscilação de rede.

## O que tornaria o teste mais robusto?

A inclusão de atributos exclusivos para automação diretamente no código-fonte do frontend da aplicação, como:

```html
data-testid="botao-checkout"
```

Isso blindaria o script de testes contra alterações visuais de CSS ou design.

## Quais são os riscos de manutenção?

O principal risco ocorre se houver uma quebra estrutural na jornada do usuário, como transformar o fluxo de checkout em um formulário multi-etapas (*stepper*) ou alterar as rotas e URLs das páginas principais do sistema.

# 7. Reflexão no Contexto do LocalEats

## Testes automatizados substituem testes manuais?

Não totalmente. Eles eliminam a necessidade de testes manuais repetitivos em fluxos de regressão críticos (como caminhos felizes), mas não cobrem a validação de experiência estética (UX), design responsivo e testes exploratórios de usabilidade.

## Vale a pena automatizar todos os fluxos?

Não. O custo de desenvolvimento e manutenção de testes E2E em fluxos secundários, de baixa conversão ou altamente instáveis ultrapassa o retorno sobre o investimento. O foco deve ser na matriz de criticidade do negócio.

## Qual tipo de teste deve ser priorizado?

A pirâmide de testes deve ser respeitada. Testes unitários devem ser a base por serem rápidos e baratos. Os testes funcionais E2E (Playwright) devem cobrir estritamente a camada do topo, focando na integração dos fluxos essenciais de negócio da aplicação.

## Como isso ajuda no projeto do grupo?

Protege o LocalEats contra regressões indesejadas na interface. Sempre que novas alterações de layout forem efetuadas no ecossistema web, a suíte roda em poucos segundos em background, assegurando que o cliente final consiga se autenticar e fechar compras sem impedimentos técnicos.