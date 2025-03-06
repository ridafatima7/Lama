const { verifyToken, verifyTokenandAuth, verifyTokenandAdmin } = require('./verifyToken');
const { Order } = require('../models/OrderModel');

const router = require('express').Router();
//--------- CREATE --------------
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.send(200).json(savedOrder);
    } catch {
        res.send(400).json('Order not added');
    }
});
// --------------UPDATE -------------------
router.put('/:id', verifyTokenandAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(400).json('Order not updated')
    }
})
//-------------- DELETE-------------------
router.delete('/:id', verifyTokenandAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')
    } catch (err) {
        res.status(400).json('Order not deleted')
    }
})
//--------------- GET USER ORDERS------------------
router.get('/find/:userId', verifyTokenandAdmin, async (req, res) => {
    try {
        const Order = await Order.find({ userId: req.params.userId })
        res.status(200).json(Order)
    } catch (err) {
        res.status(400).json('Order Not Deleted')
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
//--------------------GET MONTHLY INCOME--------------
router.get('/income', verifyTokenandAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project:
                {
                    month: { $month: "createdAt" },
                    sales: "$amount"
                },
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.send(200).json(income);
    } catch (err) {
        res.send(200).json(err);
    }

})

module.exports = router; 
