// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Invisti API',
      version: '1.0.0',
      description: 'Api de controle de finanças',
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Rotas relacionadas à autenticação de usuários',
      },
      {
        name: 'Receita',
        description: 'Rotas relacionadas à gestão de saldos',
      },
      {
        name: 'Ganhos',
        description: 'Rotas relacionadas os ganhos do usuário',
      },
      {
        name: 'Gastos',
        description: 'Rotas relacionadas os gastos do usuário',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000', // URL base da sua API
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        BalanceResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '8a109e53-9743-450a-9390-ff7537e34aa8',
            },
            balance: {
              type: 'string',
              example: '1000',
            },
            date: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-29T20:53:30.486Z',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              example: '7e9d16ec-52ee-44ee-9608-cc59a1091202',
            },
          },
        },
        BalanceItem: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'aea22880-d832-44fa-9309-e47590080f88',
            },
            balance: {
              type: 'string',
              example: '100',
            },
            date: {
              type: 'string',
              format: 'date-time',
              example: '2024-10-10T22:47:03.752Z',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              example: '3057d89f-2056-4265-9fe6-10b45f0240ce',
            },
          },
        },
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/router.ts'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerSetup = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};