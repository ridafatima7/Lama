const { verifyToken,verifyTokenandAuth,verifyTokenandAdmin } = require('./verifyToken');
const {Product}= require( '../models/productModel');

const router = require('express').Router();
// CREATE 
router.post("/", verifyTokenandAdmin,async(req, res) => {
    const newProduct=new Product(req.body);
    try{
     const savedProduct=await newProduct.save();
     res.send(200).json(savedProduct);
    }catch{
        res.send(400).json('Product not added');

    }
});
// UPDATE 
router.put('/:id', verifyTokenandAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id);
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(400).json('product not updated')
    }
})
// DELETE
router.delete('/:id', verifyTokenandAdmin, async (req, res) => {
    try {
       await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
    } catch (err) {
        res.status(400).json('Product not deleted')
    }
})
// GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
       const Product=await Product.findById(req.params.id)
       res.status(200).json(Product)
    } catch (err) {
        res.status(400).json('Product not deleted')
    }
})
// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;
        
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router; 
