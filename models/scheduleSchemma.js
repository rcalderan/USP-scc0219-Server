const _COLLECTION_NAME='schedule'
const mongoose=  require('mongoose')
const _DEFAULTS = require('./defaults/schedule')
const schemaOptions ={ 
    collection: _COLLECTION_NAME,
    versionKey: false
}


const animalSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    owner: {
        type: Number,
        required: true
    },
    service:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
},schemaOptions);
//{ _id: 3, owner: 7,  service:"Grooming", description: "take Pipoca", date: new Date(2019, 11, 2, 19, 20, 0, 0) }
animalSchema.methods.collumns = function () {
    return {_id:1, owner: 1, service: 1,description:1,date:1}
}

animalSchema.statics.GetDefaultValues = function(){
    return _DEFAULTS
}

animalSchema.statics.GetCollecionName = function(){
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, animalSchema) 


