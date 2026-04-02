const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
    type:String,
    required:true,
},
    description:String,

    image:{
    url: String,
    filename: String,
},
    price:{
        type:Number,
        required:true,
    },
    location:String,
    country:String,
    reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    // category:{
    //     type:String,
    //     enum:["mountains","arctic","farms",""]
    // }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing) {
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
//This model is constructed here(model-- it is used to make a collection)
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;// it is used to use collections in app.js file
