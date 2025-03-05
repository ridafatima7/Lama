const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const userRoutes=require('./Routes/users')
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connected'))
.catch(()=>console.log('error not connected'));

app.get('/api/test',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });