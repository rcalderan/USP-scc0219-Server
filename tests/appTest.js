const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081";
let lastId=0;

describe('Testar app', function () {
    it('test root "/"', async function () {
        let req = await axios.get(baseUrl);
        if(req.length>0)
            lastId = req[req.length-1]._id;
        assert.ok(req.status===200)
        
    })
})

describe('Test persons routes', function () {
    this.beforeAll(() => {
        baseUrl+="/person"
    })
    
    it('POST person: /person', async function () {
        var newPerson = { type: "customer",adress:"some addrs", name: "NewOne", photo: "", phone: "(16) 99721-2588", email: "admin@pet.com", password: "admin" }
        
        let response = await axios.post(baseUrl,newPerson);
        assert.deepEqual(response.data.message,"New user created.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('/person ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET person: /person/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT person: /person/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotPerson = response.data
        
        //update
        gotPerson.name+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotPerson);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Person updated!")
        //assert.ok(personId===id)

    })
    it('DELETE person: /person/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Person removed!")

    })
})
