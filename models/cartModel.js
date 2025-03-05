const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        products:[
            {
            productId:{
                type:String,
                required:true,
            },
            quantity:{
                type:String,
            },
         },
        ],
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("cart", cartSchema)