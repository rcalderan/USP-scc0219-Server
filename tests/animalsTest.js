const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081/api";
let lastId=0;

describe('Test animals routes', function () {
    this.beforeAll(() => {
        baseUrl+="/animal"
    })
    
    it('POST animals: /animal', async function () {
        var newAnimal = 
        { owner: 3, type: "dog", race: "bodercolie", name: "Mr. Picles 2", photo: "imgsrc", age: 3 }
        let response = await axios.post(baseUrl,newAnimal);
        assert.deepEqual(response.data.message,"New animal inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('animals root /animal ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET animals: /animal/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT animals: /animal/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotAnimal = response.data
        
        //update
        gotAnimal.name+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotAnimal);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Animal updated!")
        //assert.ok(personId===id)

    })
    it('DELETE animal: /animal/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Animal removed!")

    })
})
