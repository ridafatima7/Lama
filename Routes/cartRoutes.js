const { verifyToken,verifyTokenandAuth,verifyTokenandAdmin } = require('./verifyToken');
const {Cart}= require( '../models/cartModel');

const router = require('express').Router();
// CREATE 
router.post("/", verifyToken,async(req, res) => {
    const newCart=new Cart(req.body);
    try{
     const savedCart=await newCart.save();
     res.send(200).json(savedCart);
    }catch{
        res.send(400).json('Cart not added');
    }
});
// UPDATE 
router.put('/:id', verifyTokenandAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
        { 
            $set:req.body,
        },
        {
            new:true
        }
    );
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(400).json('Cart not updated')
    }
})
// DELETE
router.delete('/:id', verifyTokenandAuth, async (req, res) => {
    try {
       await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted')
    } catch (err) {
        res.status(400).json('Cart not deleted')
    }
})
// GET Cart
router.get('/find/:userId',verifyTokenandAdmin, async (req, res) => {
    try {
       const Cart=await Cart.findOne({userId:req.params.userId})
       res.status(200).json(Cart)
    } catch (err) {
        res.status(400).json('Cart not deleted')
    }
})
// GET ALL CartS
router.get('/', async (req, res) => {
    try {
        const Carts = await Cart.find();
        res.status(200).json(Carts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router; 
