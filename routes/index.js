const express= require ('express')
const router = express.Router()


router.get('/login',(req,res) =>{
    res.render('login',{layout:'login'})
})

router.get('/dashboard',(req,res) =>{
    res.send('dashboard')
})



module.exports=router