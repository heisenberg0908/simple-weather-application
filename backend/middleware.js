const JWT_SECRET=require('./config')
const jwt=require('jsonwebtoken')

const middleWare=(req,res,next)=>{
    const token=req.headers.authorization

    try {
        const decoded=jwt.verify(token,JWT_SECRET)
        req.userId=decoded.userId;
        next()
    } catch (error) {
        res.status(403).json({
            msg:'invalid authorization token'
        })
    }
}

module.exports=middleWare