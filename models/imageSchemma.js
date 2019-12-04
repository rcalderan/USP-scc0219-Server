const _COLLECTION_NAME = 'image'
const mongoose = require('mongoose')
const _DEFAULTS = require('./defaults/image')
const schemaOptions = {
    collection: _COLLECTION_NAME,
    versionKey: false
}


const imageSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    imagetype: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    }
}, schemaOptions);

//{ filename:"aaa",originalname:"bbb" },
imageSchema.methods.collumns = function () {
    return { _id: 1,imagetype:1, filename: 1, originalname: 1 }
}

imageSchema.statics.GetDefaultValues = function () {
    return _DEFAULTS
}

imageSchema.statics.GetCollecionName = function () {
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, imageSchema)


