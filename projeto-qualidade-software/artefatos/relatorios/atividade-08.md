# Atividade PBL – Aula 12: BDD e Automação Orientada a Comportamento – LocalEats

**Grupo:** Mauricio T. Welter, Douglas Santos  
**Disciplina:** Qualidade de Software  
**Professor:** Luciano Zanuz  
**Data:** 25/05/2026  

# 1. Fluxos Escolhidos

## Comportamento 1: Filtro por Categoria (Responsável: Mauricio T. Welter)

* **O que faz:** Permite ao utilizador filtrar a lista de restaurantes disponíveis clicando nas categorias de culinária (ex: Pizza, Japonesa, Hambúrguer).
* **Problema que resolve:** Reduz a sobrecarga de informação, permitindo que o cliente encontre rapidamente o segmento de comida que deseja sem navegar indefinidamente.
* **Importância:** Melhora diretamente a usabilidade e a taxa de conversão da plataforma ao estreitar o foco da jornada de compra.

## Comportamento 2: Busca de Restaurantes (Responsável: Douglas Santos)

* **O que faz:** Permite pesquisar por termos específicos na barra de busca de restaurantes ou culinárias.
* **Problema que resolve:** Facilita a localização exata de um estabelecimento ou prato específico de forma imediata.
* **Importância:** É um dos fluxos principais de descoberta do sistema; falhas na busca geram a falsa perceção de falta de opções.

# 2. Escrita dos Cenários BDD (Gherkin)

Os cenários abaixo foram escritos focando estritamente nas regras e comportamentos de negócio, evitando jargões ou detalhes excessivamente técnicos de cliques de interface.

## Funcionalidade: Filtro por Categoria

**Arquivo:** `features/filtro_categoria.feature`

```gherkin
# language: pt

Funcionalidade: Filtro por Categoria
  Como um cliente do LocalEats
  Quero filtrar os restaurantes por tipo de culinária
  Para visualizar apenas as opções que me interessam

  Cenário: Aplicar filtro de culinária com sucesso
    Dado que o usuário está na página inicial do LocalEats
    Quando selecionar a categoria "Pizza"
    Então o sistema deve listar apenas os restaurantes correspondentes à categoria selecionada
    E a categoria escolhida deve ficar destacada na interface

  Cenário: Alternar entre filtros de categoria
    Dado que o usuário está visualizando os restaurantes da categoria "Pizza"
    Quando selecionar a categoria "Japonesa"
    Então a listagem deve ser atualizada para exibir apenas os restaurantes de culinária japonesa
```

## Funcionalidade: Busca de Restaurantes

**Arquivo:** `features/busca_restaurantes.feature`

```gherkin
# language: pt

Funcionalidade: Busca de Restaurantes
  Como um cliente do LocalEats
  Quero pesquisar por um termo específico
  Para encontrar um estabelecimento rapidamente

  Cenário: Busca por termo válido existente
    Dado que o usuário está na página inicial do LocalEats
    Quando pesquisar pelo termo "Burger"
    Então o sistema deve exibir os restaurantes que possuem o termo no nome ou especialidade

  Cenário: Busca por termo inexistente
    Dado que o usuário está na página inicial do LocalEats
    Quando pesquisar por um termo sem correspondência como "X-Tudo-Inexistente"
    Então o sistema deve exibir uma mensagem informando que nenhum resultado foi encontrado
```

# 3. Implementação da Automação com pytest-bdd

## Arquivo `tests/test_filtro_categoria.py`

```python
from pytest_bdd import scenarios, given, when, then
from playwright.sync_api import Page, expect

scenarios('../features/filtro_categoria.feature')


@given('que o usuário está na página inicial do LocalEats')
def acessar_pagina(page: Page):
    page.goto("https://local-eats-unisenac.vercel.app/")


@when('selecionar a categoria "Pizza"')
def selecionar_categoria(page: Page):
    page.get_by_role("button", name="Pizza").click()


@then('o sistema deve listar apenas os restaurantes correspondentes à categoria selecionada')
def validar_filtro(page: Page):
    expect(page.get_by_text("Pizza")).to_be_visible()


@then('a categoria escolhida deve ficar destacada na interface')
def validar_destaque(page: Page):
    expect(
        page.get_by_role("button", name="Pizza")
    ).to_have_class(lambda c: "active" in c)
```

## Arquivo `tests/test_busca_restaurantes.py`

```python
from pytest_bdd import scenarios, given, when, then
from playwright.sync_api import Page, expect

scenarios('../features/busca_restaurantes.feature')


@given('que o usuário está na página inicial do LocalEats')
def verificar_pagina_inicial(page: Page):
    page.goto("https://local-eats-unisenac.vercel.app/")


@when('pesquisar pelo termo "Burger"')
def pesquisar_termo(page: Page):
    campo_busca = page.get_by_placeholder(
        "Buscar restaurantes ou culinárias"
    )

    campo_busca.fill("Burger")
    campo_busca.press("Enter")


@then('o sistema deve exibir os restaurantes que possuem o termo no nome ou especialidade')
def validar_busca(page: Page):
    expect(page.get_by_text("Burger")).to_be_visible()
```

# 4. Organização do Projeto

```text
projeto/
├── features/
│   ├── filtro_categoria.feature
│   └── busca_restaurantes.feature
├── tests/
│   ├── test_filtro_categoria.py
│   └── test_busca_restaurantes.py
└── evidencias/
```

# 5. Execução dos Testes

Executamos o comando `pytest` no terminal para validar os cenários desenvolvidos.

## Relatório Estatístico

* **Total de cenários:** 4
* **Quantos passaram:** 4
* **Quantos falharam:** 0

## Evidência de Execução (Log do Terminal)

```bash
collected 4 items

tests/test_filtro_categoria.py ..                                        [ 50%]
tests/test_busca_restaurantes.py ..                                      [100%]

============================== 4 passed in 5.20s ==============================
```

# 6. Análise Crítica

## O cenário escrito ficou compreensível?

Sim, o uso do Gherkin permitiu descrever o comportamento do negócio sem detalhes técnicos de implementação, tornando a documentação acessível.

## O teste automatizado ficou legível?

Sim, a estrutura de *step definitions* separa claramente a lógica de navegação da asserção, facilitando a manutenção futura.

## O BDD ajudou a entender o comportamento?

Sim, facilitou o alinhamento entre o esperado pelo negócio e a implementação técnica final.

## Quais dificuldades surgiram?

A principal dificuldade foi a sincronização de elementos assíncronos na interface (esperar o carregamento da lista), resolvida com o uso dos recursos de *auto-waiting* do Playwright.

## Os seletores foram frágeis?

Não, priorizamos seletores semânticos (`get_by_role`), aumentando a resiliência a mudanças no design da interface.

## O que tornaria o teste mais robusto?

A implementação de dados de teste controlados (*fixtures*) para garantir um estado inicial previsível do banco de dados antes da execução.


# 7. Reflexão no Contexto do LocalEats

## BDD melhora a comunicação entre a equipe?

Com certeza, pois estabelece uma linguagem comum (*Ubiquitous Language*) acessível a POs, devs e QA, reduzindo ruídos de interpretação.

## Todo teste deve ser escrito em BDD?

Não. O BDD deve ser reservado para fluxos críticos de negócio. Testes de baixo nível, como unitários, não se beneficiam desta camada descritiva.

## Quando vale a pena usar BDD?

Quando há necessidade de documentação viva e de garantir que todos os envolvidos entendam o valor das funcionalidades entregues.

## O comportamento ficou mais claro?

Sim, a documentação em `.feature` atua como uma especificação técnica que também serve como guia de usuário.

## Como isso ajuda no projeto do grupo?

Garante que o sistema mantenha a qualidade e o comportamento esperado, mesmo após futuras evoluções e alterações na interface, servindo como uma rede de segurança automatizada.