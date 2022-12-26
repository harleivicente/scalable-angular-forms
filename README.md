
# Boas práticas na Construção de Formulários

Esse repositório contem exemplos de como construir formulário extensíveis para uso na plataforma ZW. Mais informações sobre a teoria envolvida pode ser encontrada no repositório zw_ui [aqui](https://gitlab.com/Plataformazw/zw_ui/-/blob/master/documentation/formularios.md) e nas gravações dos encontros de apresentação desse material.

Esse repositório foi construído através da ferramenta NX, um alternativa ao Angular CLI. Para mais informações visite a [doc da ferramenta](https://nx.dev/getting-started/intro).

## Visualizando os exemplos

Pre-requisitos: Instalar Node(versão 12) e npm

1. Instalar dependências
```
> npm i
```
2. Rodar o projeto
```
> nx serve
```
3. Visite http://localhost:4200

## Conteúdo do repositório

1. Field Error Component - [apps/ui/src/app/field-error](./apps/ui/src/app/field-error/field-error.component.ts)
2. Field Info Component - [apps/ui/src/app/field-info](./apps/ui/src/app/field-info/field-info.component.ts)
3. Field Label Component - [apps/ui/src/app/field-label](./apps/ui/src/app/field-label/field-label.component.ts)
4. Form Field Component - [apps/ui/src/app/form-field](./apps/ui/src/app/form-field/form-field.component.ts)
5. Select Component - [apps/ui/src/app/select](./apps/ui/src/app/select/select.component.ts)
6. Select Option Component - [apps/ui/src/app/select-option](./apps/ui/src/app/select-option/select-option.component.ts)
7. Select Current Directive - [apps/ui/src/app/select-current.directive](./apps/ui/src/app/select-current.directive.ts)
8. Select Directive - [apps/ui/src/app/select.directive](/apps/ui/src/app/select.directive.ts)