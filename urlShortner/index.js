const express=require('express')
const app=express();
const port=8001
const URL=require('./model/url')
const urlRoute=require('./router/url')
const {connectToMongoDB}=require('./connect')

connectToMongoDB('mongodb://localhost:27017/urlshortner')
.then(console.log('MongoDB connected')).catch((err)=>console.log(err))
app.use(express.json())
app.use('/url',urlRoute)
app.get('/:id',async(req,res)=>{
    const shortId=req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{timeStamp:Date.now()}
    }})
    console.log(entry.redirectURL)
    return res.redirect(entry.redirectURL)
})
app.listen(port,()=>{console.log('some message')})