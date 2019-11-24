const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081/api";
let lastId=0;

describe('Test products routes', function () {
    this.beforeAll(() => {
        baseUrl+="/schedule"
    })
    
    it('POST schedule: /schedule', async function () {
        var newSchedule = {owner: 7,  service:"Grooming", description: "take Pipoca", date: new Date(2019, 11, 2, 19, 20, 0, 0) };
        let response = await axios.post(baseUrl,newSchedule);
        assert.deepEqual(response.data.message,"New schedule inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('schedules root /schedule ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET schedules: /schedule/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT schedules: /schedule/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotSchedule = response.data;
        
        //update
        gotSchedule.description+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotSchedule);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Schedule updated!")
        //assert.ok(personId===id)

    })
    it('DELETE schedule: /schedule/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Schedule removed!")

    })
})
