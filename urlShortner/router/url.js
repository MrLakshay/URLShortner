const express=require("express")
const router=express.Router()
const {handleGenerateShortURL,handleAnalytics}=require('../controller/url')
// console.log("done")
router.post('/',handleGenerateShortURL);
router.get('/analytics/:shortid',handleAnalytics);
module.exports=router