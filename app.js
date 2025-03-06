const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;
const userRoutes=require('./Routes/userRoutes');
const authRoutes=require('./Routes/auth');
const productRoutes=require('./Routes/productRoutes');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Db Connected'))
.catch(()=>console.log('DB not connected'));

app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.use('/product',productRoutes);

app.get('/',(req,res)=>{
    res.send('app is running')
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});