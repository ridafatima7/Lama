const { verifyToken,verifyTokenandAuth,verifyTokenandAdmin } = require('./verifyToken');
const {Order}= require( '../models/OrderModel');

const router = require('express').Router();
//--------- CREATE --------------
router.post("/", verifyToken,async(req, res) => {
    const newOrder=new Order(req.body);
    try{
     const savedOrder=await newOrder.save();
     res.send(200).json(savedOrder);
    }catch{
        res.send(400).json('Order not added');
    }
});
// --------------UPDATE -------------------
router.put('/:id', verifyTokenandAuth, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
        { 
            $set:req.body,
        },
        {
            new:true
        }
    );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(400).json('Order not updated')
    }
})
//-------------- DELETE-------------------
router.delete('/:id', verifyTokenandAuth, async (req, res) => {
    try {
       await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')
    } catch (err) {
        res.status(400).json('Order not deleted')
    }
})
//--------------- GET USER ORDERS------------------
router.get('/find/:userId',verifyTokenandAdmin, async (req, res) => {
    try {
       const Order=await Order.findOne({userId:req.params.userId})
       res.status(200).json(Order)
    } catch (err) {
        res.status(400).json('Order not deleted')
    }
})
//------------------- GET ALL ORDERS----------------
router.get('/', async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router; 
