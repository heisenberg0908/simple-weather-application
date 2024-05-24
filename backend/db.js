const mongoose=require('mongoose')
mongoose.connect('')//ur mongodb connection string


const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String
})

const User=mongoose.model('User',userSchema)

module.exports={User}