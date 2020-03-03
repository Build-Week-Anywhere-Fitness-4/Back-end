const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

const aUser = {username: "AR", password: "test"}

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
        let userAuth;
        it('Logging in a User and return a token', () => {
            return request(server).post('/api/login').send(aUser)
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.type).toMatch(/json/i);
                    userAuth = res.body.token;
                })

        });
        it("should return a 201", () => {
            return request(server)
            .post("/api/classes/")
            .set({ Authorization: userAuth})
            .send({
                name: "HARD BODY WORKOUT",
                type: "PILATES AND PLANKS",
                duration: "1 hour",
                intensity: "high",
                location: "MOUNTAINS",
                description: "YOU'RE GOING TO HATE THIS CLASS UNTIL YOU SEE THE RESULTS",
                start_time: "7:00 AM",
                size: "12",
                max_size: "14",
                instructor_id: 1
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
    })

    describe("PUT api/classes/1", () => {
        let userAuth;
        it('Logging in a User and return a token', () => {
            return request(server).post('/api/login').send(aUser)
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.type).toMatch(/json/i);
                    userAuth = res.body.token;
                })
        });

        it("Allows instructor to edit class", () => {
            return request(server)
            .put('/api/classes/1')
            .set({ Authorization: userAuth})
            .send({
                location: 'ma\'s basement' 
            })
            .then(res => {
                expect(res.status).toBe(200)
            })

        })
    })

    describe("DELETE api/classes/1", () => {
        let userAuth;
        it('Logging in a User and return a token', () => {
            return request(server).post('/api/login').send(aUser)
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.type).toMatch(/json/i);
                    userAuth = res.body.token;
                })
        });

        it("deletes class", () => {
            return request(server)
            .delete('/api/classes/1')
            .set({ Authorization: userAuth})
            .then( res => {
                expect(res.status).toBe(200)
            })
        })
    })

})

