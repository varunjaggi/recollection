const express= require ('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

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

router.get('/memory/add', ensureAuth, (req, res) => {
  res.render('memory/add')
})



module.exports=router