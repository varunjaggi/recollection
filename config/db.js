const mongoose= require ('mongoose')
const { use } = require('passport')

const connectDB= async() =>
{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false 

        })
        console.log(`MongoDatabase connected:${conn.connection.host}`)
    }

    catch (err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB