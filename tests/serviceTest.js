const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081";
let lastId=0;

describe('Test services routes', function () {
    this.beforeAll(() => {
        baseUrl+="/service"
    })
    
    it('POST services: /service', async function () {
        var newService = {name:"Vacina",description:"Vacine seu animal!!!!",price:150.0};
        let response = await axios.post(baseUrl,newService);
        assert.deepEqual(response.data.message,"New service inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('services root /service ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET services: /service/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT services: /service/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotService = response.data
        
        //update
        gotService.name+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotService);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Service updated!")
        //assert.ok(personId===id)

    })
    it('DELETE service: /service/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Service removed!")

    })
})
