const router = require('express').Router();

router.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currecny:"usd",
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
        res.status(500).json(stripeErr)
        }else{
        res.status(200).json(stripeRes)
        }
    })
})
module.exports = router; 
