const express = require('express')
const dotenv =  require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const session = require('express-session')
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
//loading config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

app.use(
    session({
      secret: 'nuggets',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

app.use(express.static(path.join(__dirname,'public')))

app.use(morgan('dev'))
connectDB()

//Handle bar extensions
app.engine(
    '.hbs',
    exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
app.set('view engine', '.hbs')
//Routes
app.use('/', require("./routes/index"))
app.use('/auth', require('./routes/auth'))
// Server 
const PORT = process.env.PORT
app.listen(
    PORT, 
    console.log(`Server running on ${PORT}`)
)
