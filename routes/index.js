const express= require ('express')

const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const {upload} = require('../middleware/upload')
const Memory= require('../models/memory')



router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
      layout: 'login',
    })
  })

router.get('/dashboard', ensureAuth, async (req,res) =>{
  try{
    const memories = await Memory.find({ user: req.user.id}).lean()
    console.log("DASSSHH")
    res.render('dashboard',{
    name:req.user.firstName,
    memories})
  }

  catch(err){
    console.log(err)
  }
})



//POST UPLOAD A IMG TO DB
router.post('/memory', upload.single('file'), async(req, res, next) => { 
  console.log(req.file)
  newMemory={
    caption: req.body.caption,
    status: req.body.status,
    img:req.file.id,
    user: req.user,
    date: req.body.date
  }
  try{
    await Memory.create(newMemory)
    console.log(newMemory)
    res.redirect('/dashboard')
  }
  catch(err)
  {
    console.log(err)
  }
  
})
  

//Adding a new memory
router.get('/memory/add', ensureAuth, (req, res) => {
  res.render('memory/add')
})



module.exports=router