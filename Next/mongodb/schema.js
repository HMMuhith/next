import mongoose from "mongoose";

const Schema = mongoose.Schema

 const ProfileSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    photo: {
        type: String
    },
    phone: {
        type: Number,
        required: false,
        unique: true
    },

    isAdmin: {
        type: Boolean,
        required: false
    },
    password: {
        type: String,
        required: false
    }
})

 const Addressschema = new Schema({
    country: {
        type: String,
        default: 'Bangladesh',
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postalcode: {
        type: Number,
        required: false
    },
    house: {
        type: String,
        required: false
    }
})


 const Productschema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
},
    productname: {
        type: mongoose.Schema.Types.ObjectId,

    },
    category: {
        type: String,

    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    image: [
        {
            type: String
        }
    ],
    size: {
        type: String
    },
    stock: {
        type: String
    },
    location: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    couponcode: {
        type: String
    },
    sold: {
        type: Number,

    },
    createdat: {
        type: String,
        default: new Date().toLocaleString('en-NZ')
    },

})
 const orderschema=new Schema({
    orderid:{
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        type:String,
        ref:'Profile'
    },
    orderproduct:[{
        product_name:{
            type:String,
        },
        productid:{
            type:String,
           ref:'Products'
        },
        productimage:{
            type:String,
            
        },
          charge:{
            type:Number
        },
        quantity:{
            type:Number,
            default:0
        },
        totalprice:{
            type:Number,
            default:0
        },
    }],
    totalamount:{
        type:Number
    },
    deliveryLocation:{
        type:String,
        required:true
    }
})

 const PaymentSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
    orderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
    payment_charge: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'BDT'
    },
    payment_method: {
        type: String,
        enum: ["COD", "Card", "bKash", "Nagad", "Rocket", "Stripe", "PayPal", "Wallet"],
        required: false
    },
    status:{
        type:String,
        enum: ["pending", "processing", "successful", "failed", "refunded"],
        required:false
    },
    paidat:{
        type:String,
        default:new Date().toLocaleString('en-NZ')
    },
    transactionid:{
        type:String
    },
    devliveredat:{
        type:String,
        default:false
    },
    deliverytime:{
        type:String,
        default:false
    }

})

ProfileSchema.pre('remove', async function(next){
    await Product.deleteMany({user:this._id})
})

export const Profile=mongoose.model('profile',ProfileSchema)
export const Product=mongoose.model('products',Productschema)
export const Address=mongoose.model('adress',Addressschema)
export const Orders=mongoose.model('orders',orderschema)
export const Payment=mongoose.model('payments',PaymentSchema)