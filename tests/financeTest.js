const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081/api";
let lastId=0;

describe('Test finance routes', function () {
    this.beforeAll(() => {
        baseUrl+="/finance"
    })
    
    it('POST finance: /finance', async function () {
        var newFinance = 
        {customer:6,type:"service",date:new Date(2019,8,29,15,33),value:150.0}
        let response = await axios.post(baseUrl,newFinance);
        assert.deepEqual(response.data.message,"New finance inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('finances root /finance ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET finances: /finance/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT finances: /finance/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotFinance = response.data
        
        //update
        gotFinance.value=10;

        response = await axios.put(baseUrl+"/"+lastId,gotFinance);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Finance updated!")
        //assert.ok(personId===id)

    })
    it('DELETE finance: /finance/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Finance removed!")

    })
})
