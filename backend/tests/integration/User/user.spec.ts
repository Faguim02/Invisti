import request from 'supertest'
import { server } from '../../../src'

describe("User test integration", () => {
    it("Should test function 'signUp' and return 'account created'", async()=> {
        const app = await server

        const res = await request(app)
        .post('signUp')
        .send({})

        expect(res.body).toEqual("account created")
    })
})