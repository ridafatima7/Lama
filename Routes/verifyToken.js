const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
        if(err) res.status(403).json('Token isnt valid');
        req.user=user;
        next();
     });
    }else{
        res.send(400).json("you are not authenticated")
    }
}
const verifyTokenandAuth=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user._id=== req.params.id || req.user.isAdmin){
        next();
        }else{
        res.status(403).json('You are not alowedx to that ');
        }
    })
}
const verifyTokenandAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
        next();
        }else{
        res.status(403).json('You are not alowed to that ');
        }
    })
}
module.exports={verifyToken,verifyTokenandAuth,verifyTokenandAdmin}