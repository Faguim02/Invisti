<h1 align="center"><img src="./assets/LogoReadme.svg"></h1>

<div align="center">
  <p>
    <strong>Saiba para onde o seu dinheiro está correndo</strong>
  </p>
</div>

![GitHub repo size](https://img.shields.io/github/repo-size/faguim02/Invisti?style=for-the-badge)

## Objetivo
Invisti é um site/app para quem quer começar a investir, mas no final do mês percebe que não resta nada em sua carteira, então esse site foi pensando para essas pessoas terem um controle sobre seu dinheiro, ver suas despezas e cortar gastos desnecessarios.

## Como contribuir com o projeto
O projeto é livre para que qualquer tipo de contribuição seja bem vinda.
Caso tenho vontande em contribuir com o projeto, 
[Click aqui para seguir os passos](./Contribuir.md).

## Tecnologias utilizadas
### Backend
- Typescript
- Node
- Expess
- PrismaOrm
- jsonwebtoken
- cors
- bcrypt
### Frontend
- Typescript
- React
- Axios
- Cookies-ts

## Diagrama de caso de casi de uso

<img src="./diagrams/usecase.svg"/>


## Diagrama de classe

```mermaid
erDiagram
    User {
      String id
      String name
      String email
      String password
      DateTime date_created
      DateTime last_updated
    }
    ReceiveMoney {
      String id
      Decimal balance
      DateTime date
      String user_id
    }
    Income {
      String id
      Decimal amount
      String description
      DateTime date
      String user_id
    }
    Expense {
      String id
      Decimal amount
      String description
      DateTime date
      String user_id
    }
    
    User ||--o{ ReceiveMoney : "receive_money"
    User ||--o{ Income : "income"
    User ||--o{ Expense : "expense"
    ReceiveMoney }o--|| User : "user"
    Income }o--|| User : "user"
    Expense }o--|| User : "user"
```