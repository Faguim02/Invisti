import request from 'supertest'
import { server } from '../../../src'

describe("User test integration", () => {
    it("Should test function 'signUp' and return 'account created'", async()=> {
        const app = await server

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
})