require('dotenv').config();

const request = require("supertest")
const server = require("./server")

describe("server router", function(){
    it("Should return a 200", function(){
        return request(server)
        .get("/")
        .then(res => {
            expect(res.status).toBe(200)
        }) 
    })
})