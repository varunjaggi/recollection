const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleID:{
        type: String,
        required: true
    },
    displayName:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',UserSchema)