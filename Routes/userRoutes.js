const { verifyToken,verifyTokenandAuth,verifyTokenandAdmin } = require('./verifyToken');
const {User}= require( '../models/UserModel')

const router = require('express').Router();

router.get("/test", (req, res) => {
    res.send('User has successfully tested');
});

router.post('/posttest', (req, res) => {
    const username = req.body.username;
    console.log(username);
    res.send('your username is ' + username)
})
//UPDATE_USER
router.put('/:id', verifyTokenandAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(res.body.password, process.env.PASS_SEC)
            .toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {
           new:true
        })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json(' not updated User')
    }
})
//DELETE USER
router.delete('/:id', verifyTokenandAdmin, async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted !')
    } catch (err) {
        res.status(400).json(' not deleted User')
    }
})
//GET USER
router.get('/find/:id', verifyTokenandAdmin, async (req, res) => {
    try {
       const user=await User.findById(req.params.id)
       const {password,...others}=user.doc;
       res.status(200).json(others)
    } catch (err) {
        res.status(400).json(' not deleted User')
    }
})
//GET ALL USERS
router.get('/', verifyTokenandAdmin, async (req, res) => {
    const query=req.query.new;
    try {
       const user=query ? await User.find().limit(5).sort({_id:-1}) : await User.find()
       const {password,...others}=user.doc;
       res.status(200).json(others)
    } catch (err) {
        res.status(400).json(' not deleted User')
    }
})
//GET USERS stats
router.get('/stats', verifyTokenandAdmin, async (req, res) => {
    const date=new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear(),-1))
    try {
       const data=await User.aggregate([
        {$match:{createdAt:{$gte:lastyear}}},
        {$project:{$month:"$createdAt"}},
        {$group:{
            _id:"$month",
            total:{$sum:1},
        }}
       ])
       res.status(200).json(data)
    } catch (err) {
        res.status(400).json('')
    }
})
module.exports = router; 
