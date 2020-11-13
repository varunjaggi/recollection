const mongoose = require('mongoose')

const memorySchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'users'
    },
    status:{
        type: String,
        default: 'private',
        enum: ['public', 'private']
    },
    date: {
        type:Date
    },
    img: 
    { 
        type: String 
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Memory',memorySchema)