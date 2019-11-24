const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081/api";
let lastId=0;

describe('Test products routes', function () {
    this.beforeAll(() => {
        baseUrl+="/product"
    })
    
    it('POST products: /product', async function () {
        var newProduct = {name:"Tapete Higienico",description:"Tapete mega higienico",photo:"/assets/tapete_higienico_lavavel_1.jpg",price:20.0,stock:18,sold:2};
        let response = await axios.post(baseUrl,newProduct);
        assert.deepEqual(response.data.message,"New product inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('products root /product ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET products: /product/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT products: /product/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotProduct = response.data
        
        //update
        gotProduct.name+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotProduct);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Product updated!")
        //assert.ok(personId===id)

    })
    it('DELETE product: /product/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Product removed!")

    })
})
