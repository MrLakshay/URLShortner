const express=require("express")
const router=express.Router()
const url=require('../model/url')

router.get('/',async (req,res)=>{
    const allURLs=await url.find({});
    return  res.render("home",{
        url:allURLs
    })
})


module.exports=router