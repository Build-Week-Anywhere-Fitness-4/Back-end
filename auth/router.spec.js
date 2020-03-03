const request = require("supertest")
const server = require("../api/server")

describe("authentication router",  () =>{
      describe('testing auth routes', () => {
        describe('testing POST /api/register', () => {
          it('should return code 500 with no username, no password', async () => {
            const res = await request(server)
              .post('/api/register')
              .send({});
            expect(res.status).toBe(500);
          })
        })
        describe('testing POST /api/login', () => {
            it('should return code 201 with a successful login', async () => {
                await request(server)
                .post('/api/register')
                .send({username: "test", password: "test", email: "test", role: "client"})
                const res = await request(server)
                .post('/api/login')
                .send({username: 'test', password: 'test'})
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
        })
    })
})

