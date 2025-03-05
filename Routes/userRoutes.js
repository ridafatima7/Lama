const router = require('express').Router();

router.get("/usertest", (req, res) => {
    res.send('User has successfully tested');
});
router.post('userposttest',(req,res)=>{
    const username=req.body.username;
    console.log(user.name);
    res.send('your username is ' + username)
})
module.exports = router;  // ✅ Fix `module.export` to `module.exports`
