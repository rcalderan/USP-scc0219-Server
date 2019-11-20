const _COLLECTION_NAME='cart'
const mongoose=  require('mongoose')
const _DEFAULTS = require('./defaults/cart')
const schemaOptions ={ 
    collection: _COLLECTION_NAME,
    versionKey: false
}


const cartSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    owner: {
        type: Number,
        required: true
    },
    product:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    value:  {
        type: Number,
        required: true
    }
},schemaOptions);

//{ _id: 5, owner: 7, product:1, description: "Arranhador",count:2, value: 120.99 },
cartSchema.methods.collumns = function () {
    return {_id:1, owner: 1, product:1,description: 1,count:1,value:1}
}

cartSchema.statics.GetDefaultValues = function(){
    return _DEFAULTS
}

cartSchema.statics.GetCollecionName = function(){
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, cartSchema) 


