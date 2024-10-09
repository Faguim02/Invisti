import request from 'supertest'
import { server } from '../../../src'
import { ReceiveMoney } from '../../../src/data/Dtos'

describe("ReceiveMoney test integration", () => {
    it("Should test router post:'/money' return true", async () => {

        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const data = {
            balance: 100
        } as ReceiveMoney

        const res = await request(app)
        .post('/money')
        .set('Authorization', `Bearer ${token}`)
        .send(data)

        expect(res).toBe(true)
    });

    it("Should test router get:/current return proprietary balance", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/current')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('balance')
    })

    it("Should test router get:/current/:month/:year return proprietary balance", async() => {
        const app = await server

        const dataUser = {
            email: "jonh@test",
            password: "12345678"
        }

        const token = await request(app)
        .post('/signIn')
        .send(dataUser)

        const res = await request(app)
        .get('/current/10/2024')
        .set('Authorization', `Bearer ${token}`)

        expect(res).toHaveProperty('balance')
    })
})