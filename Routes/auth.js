const router=require('express').Router()
const User=require('../models/UserModer');
const CryptoJS=require('crypto-js');
//--------------REGISTER---------------

router.post('/register',async (req,res)=>{
    const  newUser=new User({
        username:res.body.username,
        email:res.body.email,
        password:CryptoJS.AES.encrypt(res.body.password,process.env.PASS_SEC).toString(),
    })
    try{
        const savedUser=await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
    }
    catch(err){
       console.log(err);
       res.status(404).json(err);
    }
})
router.post("/login", async (req, res) => {
    try {
        // ✅ Fix: Use findOne (capital O)
        const user = await User.findOne({ username: req.body.username });

        // ✅ Fix: Properly handle user not found
        if (!user) {
            return res.status(400).json({ message: "Wrong Credentials" });
        }

        // ✅ Fix: Decrypt password properly
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);

        // ✅ Fix: Check if decrypted password matches
        if (password !== req.body.password) {
            return res.status(400).json({ message: "Wrong Credentials" });
        }

        // ✅ Success: Send user details (without password)
        const { password: _, ...userWithoutPassword } = user._doc;
        res.status(200).json(userWithoutPassword);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports=router;
