const _COLLECTION_NAME='finance'
const mongoose=  require('mongoose')
const _DEFAULTS = require('./defaults/finace')
const schemaOptions ={ 
    collection: _COLLECTION_NAME,
    versionKey: false
}


const financeSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    customer: {
        type: Number,
        default:""
    },
    value:  {
        type: Number,
        required: true
    },
    date:  {
        type: Date,
        required: true
    },
},schemaOptions);
//{_id:6,customer:6,type:"service",date:new Date(2019,8,29,15,33),value:150.0}
financeSchema.methods.collumns = function () {
    return {_id:1, customer: 1, type:1,date: 1,value:1}
}

financeSchema.statics.GetDefaultValues = function(){
    return _DEFAULTS
}

financeSchema.statics.GetCollecionName = function(){
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, financeSchema) 


