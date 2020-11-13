const express = require('express')
const dotenv =  require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
//loading config
dotenv.config({path: './config/config.env'})
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport)

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json());
connectDB()

//Sessions
app.use(
    session({
      secret: 'nuggets',
      resave: false,
      saveUninitialized:true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname,'public')))

app.use(morgan('dev'))


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
