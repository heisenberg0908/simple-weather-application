const express=require('express')
const app=express()
const router=require('./routes/index')
const cors=require('cors')
app.use(express.json())
app.use(cors())


app.use('/api/v1',router)



const port=3000;
app.listen(port,()=>{
    console.log(`app is listening to port ${port}`)
})