const express=require('express')
const {User} =require('../db')
const zod=require('zod')
const jwt=require('jsonwebtoken')
const JWT_SECRET=require('../config')
const axios=require('axios')
const middleWare=require('../middleware')

const router=express.Router()


router.get('/',(req,res)=>{
    res.status(200).send('home page')
})

const signupData=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    userName:zod.string(),
    password:zod.string()
})

router.post('/signup',async(req,res)=>{
    const {success}=signupData.safeParse(req.body)
    if(!success){
        return res.status(403).json({
            msg:"invalid inputs "
        })
    }
    const existingUser=await User.findOne({
        userName:req.body.userName
    })
    if(existingUser){
        return res.status(411).json({
            msg:'user already exists , please login ....'
        })
    }
    const user=await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        password:req.body.password
    })
    const userId=user._id;

    const token=jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        msg:'user created successfully',
        token:token
    })
})

const signinData=zod.object({
    userName:zod.string().email(),
    password:zod.string().min(5)
})

router.post('/signin',async(req,res)=>{
    const {success}=signinData.safeParse(req.body)
    if(!success){
        res.status(403).json({
            msg:'invalid data type'
        })
    }
    const user=await User.findOne({
        userName:req.body.userName,
        password:req.body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})



router.get('/weatherinfo',async(req,res)=>{
    const apikey='62d4f882e90d464baa8105401242803';
    const cityInput=req.query.city;
    
    try {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityInput}`)
        .then((response)=>{
            const weatherdata=response.data;
            res.json({
                weatherdata
            })
        })
    } catch (error) {
        res.status(400).json({
            msg:'somthing occured during sending ur request'
        })
    }
})

module.exports=router