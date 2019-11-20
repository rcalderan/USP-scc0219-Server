const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl ="http://localhost:8081";
let lastId=0;

describe('Test products routes', function () {
    this.beforeAll(() => {
        baseUrl+="/cart"
    })
    
    it('POST carts: /cart', async function () {
        var newCart = { _id: 5, owner: 7, product:1, description: "Arranhador",count:2, value: 120.99 };
        let response = await axios.post(baseUrl,newCart);
        assert.deepEqual(response.data.message,"New cart inserted.")
        if(response.data._id>0){
            lastId=response.data._id;
            
        }

    })

    it('carts root /cart ', async function () {
        let req = await axios.get(baseUrl);
        let expected =200;
        let statusCode = req.status;
        let result = req.data;

        assert.deepEqual(statusCode,expected)
        assert.notEqual(result.length,0)
    })
    it('GET carts: /cart/id', async function () {
        let req = await axios.get(baseUrl+"/"+lastId);
        let got=req.data;
        assert.deepEqual( req.status,200)
        assert.deepEqual( got._id,lastId)

    })
    
    it('PUT carts: /cart/id', async function () {
        let response = await axios.get(baseUrl+"/"+lastId);
        var gotCart = response.data;
        
        //update
        gotCart.description+=" (updated)";

        response = await axios.put(baseUrl+"/"+lastId,gotCart);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Cart updated!")
        //assert.ok(personId===id)

    })
    it('DELETE cart: /cart/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Cart removed!")

    })
})
