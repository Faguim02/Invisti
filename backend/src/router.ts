import { Router } from "express";
import { UserController } from "./controller/UserController";
import { ReceiveMoneyController } from "./controller/ReceiveMoneyController";
import { isAuthentication } from "./middlewares/isAuthentication";
import { incomeController } from "./controller/IncomeController";
import { ExpenseController } from "./controller/ExpenseController";

export const router = Router();

/**
 * @swagger
 * /signUp:
 *   post:
 *     tags:
 *      - Autenticação
 *     summary: Cria um novo usuário.
 *     description: Cria um novo usuário com os dados fornecidos.
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name: 
 *           type: string
 *           example: John Doe
 *           description: Nome do usuário.
 *          email:
 *           type: string
 *           example: jonh@email.com
 *           description: Email do usuário.
 *          password:
 *           type: string
 *           example: 12345678
 *           description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: account created.
 */
router.post('/signUp', new UserController().signUp);

/**
 * @swagger
 * /signIn:
 *   post:
 *     tags:
 *      - Autenticação
 *     summary: Autentica um usuário.
 *     description: Autentica um usuário com os dados fornecidos.
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *           example: john@gmail.com
 *           description: Email do usuário.
 *          password:
 *           type: string
 *           example: 12345678
 *           description: Senha do usuário.
 *     responses:
 *      200:
 *       description: Usuário autenticado com sucesso.
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           jwt: 
 *            type: string
 *            description: Token de authenticação
 *            example: code
 *           id: 
 *            type: string
 *            description: id do usuario
 *            example: 7e9d16ec-52ee-44ee-9608-cc59a1091202
 *           name:
 *            type: string
 *            description: nome do usuario
 *            example: john
 *           email:
 *            type: string
 *            description: email do usuario
 *            example: john@gmail.com
 */
router.post('/signIn', new UserController().signIn);

/**
 * @swagger
 * /money:
 *   post:
 *     tags:
 *      - Receita
 *     summary: Insere o valor inicial do usuário.
 *     description: Insere o valor inicial do usuário com os dados fornecidos.
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          balance:
 *           type: number
 *           example: 1000
 *           description: Saldo do usuário.
 *     responses:
 *      200:
 *       description: Usuário autenticado com sucesso.
 *       content:
 *        application/json:
 *         schema:
 *          type: boolean
 *          example: true
 */
router.post('/money', isAuthentication, new ReceiveMoneyController().insertFirstMoney);
/**
 * @swagger
 * /current:
 *   get:
 *     tags:
 *      - Receita
 *     summary: Recebe o saldo atual do usuário.
 *     description: Recebe o saldo atual do hete com os dados fornecidos.
 *     responses:
 *      200:
 *       description: Saldo atual do usuário.
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/BalanceResponse'
 */
router.get('/current', isAuthentication, new ReceiveMoneyController().findAllMoney)
/**
 * @swagger
 * /current/:month/:year:
 *   get:
 *     tags:
 *      - Receita
 *     summary: Recebe o saldo de acordo com o mes e ano.
 *     description: Recebe o saldo atual do usuário com os dados fornecidos de acordo com o mes e ano.
 *     responses:
 *      200:
 *       description: Saldo daquele mes recebido.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/BalanceItem'
 */
router.get('/current/:month/:year', isAuthentication, new ReceiveMoneyController().findMoneyForMonth)

/**
 * @swagger
 * /income:
 *   post:
 *     tags:
 *      - Ganhos
 *     summary: Insere uma nova receita.
 *     description: Insere uma nova receita com os dados fornecidos.
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          amount:
 *           type: number
 *           example: 1000
 *           description: Valor da receita.
 *          description:
 *           type: string
 *           example: Salario
 *           description: Descrição da receita.
 *     responses:
 *      200:
 *       description: Receita inserida com sucesso.
 *       content:
 *        application/json:
 *         schema:
 *          type: string
 *          example: received success!
 */
router.post('/income', isAuthentication, new incomeController().incomeMoney);
/**
 * @swagger
 * /income:
 *   get:
 *     tags:
 *      - Ganhos
 *     summary: Recebe todas as receitas.
 *     description: Recebe todas as receitas do usuário.
 *     responses:
 *      200:
 *       description: Receitas recebidas.
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           id:
 *            type: string
 *            format: uuid
 *            example: 8a109e53-9743-450a-9390-ff7537e34aa8
 *           amount:
 *            type: string
 *            example: 1000 
 */
router.get('/income', isAuthentication, new incomeController().findAllIncome);
/**
 * @swagger
 * /income/:month/:year:
 *   get:
 *     tags:
 *      - Ganhos
 *     summary: Recebe todas as receitas de acordo com o mes e ano.
 *     description: Recebe todas as receitas do usuário de acordo com o mes e ano.
 *     responses:
 *      200:
 *       description: Receitas recebidas.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/BalanceItem'
 */
router.get('/income/:month/:year', isAuthentication, new incomeController().findIncomeForMonth);

/**
 * @swagger
 * /expense:
 *   post:
 *     tags:
 *      - Gastos
 *     summary: Insere um novo gasto.
 *     description: Insere uma nova despesa
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          amount:
 *           type: number
 *           example: 1000
 *           description: Valor da receita.
 *          description:
 *           type: string
 *           example: Salario
 *           description: Descrição da receita.
 *     responses:
 *      200:
 *       description: Receita inserida com sucesso.
 *       content:
 *        application/json:
 *         schema:
 *          type: string
 *          example: expense success!
 */
router.post('/expense', isAuthentication, new ExpenseController().expenseMoney);
/**
 * @swagger
 * /expense:
 *   get:
 *     tags:
 *      - Gastos
 *     summary: Retorna os gastos.
 *     description: Recebe todas as despesas do usuário.
 *     responses:
 *      200:
 *       description: Receitas recebidas.
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           id:
 *            type: string
 *            format: uuid
 *            example: 8a109e53-9743-450a-9390-ff7537e34aa8
 *           amount:
 *            type: string
 *            example: 1000 
 */
router.get('/expense', isAuthentication, new ExpenseController().findAllExpense);
/**
 * @swagger
 * /expense/:month/:year:
 *   get:
 *     tags:
 *      - Gastos
 *     summary: Recebe todas os gastos de acordo com o mes e ano.
 *     description: Recebe todas os gastos do usuário de acordo com o mes e ano.
 *     responses:
 *      200:
 *       description: Receitas recebidas.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/BalanceItem'
 */
router.get('/expense/:month/:year', isAuthentication, new ExpenseController().findEXpenseForMonth);