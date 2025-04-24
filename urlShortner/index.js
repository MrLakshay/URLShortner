const express=require('express')
const app=express();
const port=8001
const URL=require('./model/url')
const urlRoute=require('./router/url')
const {connectToMongoDB}=require('./connect')
const path=require('path')
const staticRoute=require('./router/staticRoute')

connectToMongoDB('mongodb://localhost:27017/urlshortner')
.then(console.log('MongoDB connected')).catch((err)=>console.log(err))
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.get('/test',async(req,res)=>{
    const allURLs=await URL.find({})
    return res.render("home",{
        urls:allURLs,
    })
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/url',urlRoute)
app.get('/',staticRoute)
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