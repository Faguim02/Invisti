import request from 'supertest'
import { server } from '../../../src'
import { Income } from '../../../src/data/Dtos'

describe("Income test integration", () => {
    it("Should test router post:income return 'received success!'", async() => {
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
        } as Income

        const res = await request(app)
        .post('/income')
        .set('Authorization', `Bearer ${token}`)
        .send(data)

        expect(res).toEqual('received success!')
    })

    it("Should test router get:income return 'amount'", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/income')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('amount')
    })

    it("Should test router post:income return 'amount'", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/income/10/2024')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('amount')
    })
})