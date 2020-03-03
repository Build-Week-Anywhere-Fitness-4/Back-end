const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

describe("classes router", () => {
    beforeEach(async () => {
        await db('classes').truncate();
    })

    describe('GET /api/classes/',() => {
        it('should return a 400 with no auth headers', async () => {
            const res = await request(server)
            .get('/api/classes')
            expect(res.status).toBe(400)
        })
    })

    describe('GET /api/classes/1', () => {
        it('should return a 404', () => {
            return request(server)
            .get("/api//classes/1")
            .then( res => {
                expect(res.status).toBe(404)
            })
        })
    })

    describe("POST /api/classes", () => {
        it("should return a 201", () => {

        })
    })
})