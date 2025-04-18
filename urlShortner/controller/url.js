const shortid =require('shortid')
const URL=require('../model/url')
async function handleGenerateShortURL(req,res) {
    const shortID=shortid();
    console.log('reached controller')
    const body=req.body;
    console.log(body)
    if(!body.url){
        console.log('body not found')
        return res.status(400).json({status:'incorrect request'});
    }
    console.log('body found')
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })
    console.log(shortID)
    return res.json({id:shortID});
}
async function handleAnalytics(req,res) {
    const shortId=req.params.shortid;
    console.log(req.params)
    console.log(shortId)
    // return res.json({})
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}
module.exports={
    handleGenerateShortURL,
    handleAnalytics
}