const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081"

describe('Testar app', function () {
    this.beforeAll( () => {
    })
    it('test root "/"', async function () {
        let newO ={ _id: 1, type: "admin", name: "administer", photo: "", phone: "(16) 99721-2588", email: "admin", password: "admin" };
        let req = await axios.post(baseUrl+"/person",newO);
        //console.log(req.status);
        assert.ok(req.status===200)
    })
})

describe('Test persons routes', function () {
    this.beforeAll(() => {
        baseUrl+="/person"
    })
    it('/person ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;//must be an array

        assert.deepEqual(statusCode,expected)
        assert.ok(result.length>0)
    })
    it('GET person: /person/id', async function () {
        let id =1;
        let req = await axios.get(baseUrl+"/"+id);
        let got=req.data;

        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,id)

    })
    //{ _id: 1, type: "admin", name: "administer", photo: "", phone: "(16) 99721-2588", email: "admin", password: "admin" },
    
    it('POST person: /person', async function () {
        var newPerson = { type: "customer", name: "NewOne", photo: "", phone: "(16) 99721-2588", email: "admin", password: "admin" }
        
        let response = await axios.post(baseUrl,newPerson);
        assert.deepEqual(response.data.message,"New user created.")
        assert.deepEqual( response.status,200)
        //assert.ok(personId===id)

    })
    
    it('PUT person: /person', async function () {
        let id=3;
        let response = await axios.get(baseUrl+"/"+id);
        var gotPerson = response.data
        assert.deepEqual(gotPerson._id,id)//must load id
        
        //update
        gotPerson.name+=" (updated)";

        response = await axios.put(baseUrl,gotPerson);
        assert.deepEqual( response.status,200)
        response = await axios.get(baseUrl+"/"+id);
        console.log(response.data)
        assert.deepEqual(response.data.name,gotPerson.name)
        //assert.ok(personId===id)

    })
})
