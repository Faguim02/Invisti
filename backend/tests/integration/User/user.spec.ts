import request from 'supertest'
import { server } from '../../../src'

describe("User test integration", () => {
    const app = server
    it("Should test router '/signUp' and return 'account created'", async()=> {

        const data = {
            name: "jonh",
            email: "jonh@test",
            password: "12345678"
        }

        const res = await request(app)
        .post('/signUp')
        .send(data)

        expect(res.body).toEqual("account created")
    })

    it("Should test router '/signIn' and return the JWT", async() => {

        const dataUser = {
            name: "jonh",
            email: "jonh@test",
            password: "12345678"
        }

        await request(app)
        .post('/signUp')
        .send(dataUser)
        
        const data = {
            email: "jonh@test",
            password: "12345678"
        }

        const res = await request(app)
        .post('/signIn')
        .send(data)

        expect(res.body).toHaveProperty("jwt")
    })
})