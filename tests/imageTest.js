const assert = require('assert').strict
const app = require('../app')
const axios = require('axios');

let baseUrl = "http://localhost:8081/api";
let lastId = 0;

describe('Test imageUpload', function () {
    this.beforeAll(() => {
        baseUrl += "/image"
    })

    it('POST image: /image', async function () {
        const mockImage =  { imagetype:".jpg",filename:"none",originalname:"none.jpg"}

        let response = await axios.post(baseUrl,mockImage);
        assert.deepEqual(response.data.message, "New image uploaded")
        if (response.data._id > 0) {
            lastId = response.data._id;

        }

    })/*
    it.skip('GET image: /image/id', async function () {
        let req = await axios.get(baseUrl + lastId);
        let got = req.data;
        assert.deepEqual(req.status, 200)
        assert.deepEqual(got._id, lastId)

    })
    
    it.skip('DELETE image: /image/id', async function () {
        response = await axios.delete(baseUrl+"/"+lastId);
        assert.deepEqual( response.status,200)
        assert.deepEqual(response.data.message,"Person removed!")

    })*/

})
