const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const userRoutes=require('./Routes/userRoutes')
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connected'))
.catch(()=>console.log('error not connected'));

app.use('/user',userRoutes);
// app.get('/',(req,res)=>{
//     res.send('app is running')
// })
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });