import request from 'supertest'
import { server } from '../../../src'
import { Expense } from '../../../src/data/Dtos'

describe("Income test integration", () => {
    it("Should test router post:expense return 'expensed success!'", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const data = {
            amount: 10
        } as Expense

        const res = await request(app)
        .post('/expense')
        .set('Authorization', `Bearer ${token}`)
        .send(data)

        expect(res).toEqual('received success!')
    })

    it("Should test router get:expense return 'amount'", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/expense')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('amount')
    })

    it("Should test router post:expense/m/y return 'amount'", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/expense/10/2024')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('amount')
    })
})