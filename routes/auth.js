const express= require ('express')
const passport = require('passport')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


//auth callback
router.get(
    '/google/callback/',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard')
    }
  )


//Logout user
router.get('/logout',(req,res)=>
{
  req.logout()
  res.redirect('/')
})


module.exports=router