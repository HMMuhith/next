import mongoose from "mongoose";

async function Run() {
  try {
  
    await mongoose.connect(
      "mongodb+srv://muhith:mk246822@cluster0.k4lgw6j.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0"

    );
    console.log("✅ MongoDB connected");


    const ProductSchema = new mongoose.Schema({}, { strict: false });
    const Product = mongoose.model("product", ProductSchema);


  
     
    const DB = [
      { name: "Laptop", category: "Electronics", price: 800, quantity: 10, brand: "Dell", rating: 4.5, inStock: true, supplier: "TechWorld" },
      { name: "Phone", category: "Electronics", price: 500, quantity: 25, brand: "Samsung", rating: 4.3, inStock: true, supplier: "MobileHub" },
      { name: "Tablet", category: "Electronics", price: 300, quantity: 15, brand: "Apple", rating: 4.7, inStock: true, supplier: "iStore" },
      { name: "Monitor", category: "Electronics", price: 200, quantity: 8, brand: "LG", rating: 4.1, inStock: true, supplier: "DisplayZone" },
      { name: "Keyboard", category: "Electronics", price: 50, quantity: 40, brand: "Logitech", rating: 4.0, inStock: true, supplier: "TechWorld" },

      { name: "Shirt", category: "Clothing", price: 50, quantity: 60, brand: "Zara", rating: 4.2, inStock: true, supplier: "FashionHouse" },
      { name: "Pants", category: "Clothing", price: 70, quantity: 35, brand: "Levis", rating: 4.4, inStock: true, supplier: "DenimStore" },
      { name: "Jacket", category: "Clothing", price: 120, quantity: 20, brand: "H&M", rating: 4.1, inStock: false, supplier: "WinterWear" },
      { name: "Shoes", category: "Clothing", price: 90, quantity: 30, brand: "Nike", rating: 4.6, inStock: true, supplier: "ShoeCenter" },
      { name: "Socks", category: "Clothing", price: 10, quantity: 100, brand: "Adidas", rating: 4.0, inStock: true, supplier: "FashionHouse" },

      { name: "Apple", category: "Food", price: 2, quantity: 200, brand: "FreshFarm", rating: 4.8, inStock: true, supplier: "AgroFoods" },
      { name: "Banana", category: "Food", price: 1, quantity: 180, brand: "FreshFarm", rating: 4.7, inStock: true, supplier: "AgroFoods" },
      { name: "Orange", category: "Food", price: 3, quantity: 150, brand: "CitrusKing", rating: 4.5, inStock: true, supplier: "FruitMarket" },
      { name: "Bread", category: "Food", price: 2, quantity: 120, brand: "BakeHouse", rating: 4.2, inStock: true, supplier: "DailyNeeds" },
      { name: "Milk", category: "Food", price: 4, quantity: 90, brand: "DairyPure", rating: 4.6, inStock: true, supplier: "DailyNeeds" },

      { name: "Pen", category: "Stationery", price: 5, quantity: 300, brand: "Parker", rating: 4.1, inStock: true, supplier: "OfficeMart" },
      { name: "Notebook", category: "Stationery", price: 15, quantity: 100, brand: "Classmate", rating: 4.3, inStock: true, supplier: "OfficeMart" },
      { name: "Eraser", category: "Stationery", price: 1, quantity: 250, brand: "Faber Castell", rating: 4.0, inStock: true, supplier: "StationeryHub" },
      { name: "Bag", category: "Stationery", price: 25, quantity: 45, brand: "SkyBags", rating: 4.5, inStock: true, supplier: "TravelStore" },

      { name: "Chair", category: "Furniture", price: 150, quantity: 12, brand: "Ikea", rating: 4.2, inStock: true, supplier: "HomeDeco" },
      { name: "Table", category: "Furniture", price: 300, quantity: 6, brand: "Ikea", rating: 4.4, inStock: false, supplier: "HomeDeco" },
      { name: "Lamp", category: "Furniture", price: 50, quantity: 20, brand: "Philips", rating: 4.3, inStock: true, supplier: "LightHouse" }
    ];

   const result= await Product.aggregate([
    {
      $match:{price:{$gt:150}}
    },
    {
      $sort:{price:-1}
    },
    {$group:{_id:"$category"}}
   ])

   const result2=await Product.aggregate([
    {
      $group:{
        _id:"$category",
        totalProducts:{$sum:1},
        totalPrice:{$sum:"$price"},
        averagePrice:{$avg:"$price"},
        maxPrice:{$max:"$price"},
        minPrice:{$min:"$price"},
        totalQuantity:{$sum:"$quantity"}
      }
    }
   ])

   const result3=await Product.aggregate([
    {
      $project:{
        name:1,
        price:1,
        brand:1,
        supplier:1
      }
    }
   ])
   const result4=await Product.aggregate([
    {
      $skip:6
    }
   ])

   const result5=await Product.aggregate([
    {$match:{category:"Clothing"}},
    {$count:"Newclothing"}
   ])

   const newDB={
  name: "Laptop",
  category: "Electronics",
  tags: ["gaming", "office", "portable"]
}
const normalreult=await Product.aggregate([
  {
    $unwind:"$tags"
  }
])
//output 
// { name: "Laptop", category: "Electronics", tags: "gaming" }

// { name: "Laptop", category: "Electronics", tags: "office" }

// { name: "Laptop", category: "Electronics", tags: "portable" }


const result6=await Product.aggregate([
  { $match: { price: { $gt: 50 } } },

  {
    $group: {
      _id: "$category",
      totalProducts: { $sum: 1 },
      totalQuantity: { $sum: "$quantity" },
      avgPrice: { $avg: "$price" }
    }
  },

  { $sort: { avgPrice: -1 } }
])

const result7=await Product.aggregate([
  { $match: { category: "Electronics" } },

  {
    $project: {
      name: 1,
      price: 1,
      quantity: 1,
      _id: 0
    }
  },

  { $limit: 3 }
])


const result8=await Product.aggregate([
  {
    $match:{category:"Clothing"},
    
},
{
  $group:{
    _id:"$category",
    maximum:{$max:"$price"}
  }
}
])


const result9=await Product.aggregate([{
$match:{rating:4.2}
}])
const result10=await Product.aggregate([{
$match:{rating:4.2}
},
{
  $project:{
    name:1,
    price:1,
    brand:1
  }
}])


const result11=await Product.aggregate([
  {
    $sort:{price:1}
  },
  {
    $skip:15
  }
])


const result12=await Product.aggregate([
  {$match:{price:{$gt:200}}},
  {$count:"expensive"}
])


const result13=await Product.aggregate([
  {$match:{category:"Stationery"}}
])

const result14=await Product.aggregate([
  {
$sort:{price:1}
  },
  {
    $group:{
      _id:"$category",
      products:{
        $push:{
          name:"$name",
          brand:"$brand"
        }
      }
    }
  }
])

const result15=await Product.aggregate([
  { $group: { _id: "$category", total: { $sum: 1 } } }
])

const result16=await Product.aggregate([
  {$count:"Grandproducts"}
])

const result17=await Product.aggregate([
  {
    $group:{
      _id:null,
      avgPrice:{$avg:"$price"}
    }
  }
])

const result18=await Product.aggregate([
  {$match:{price:{$gte:100}}},
  {$group:{_id:null,totlPrice:{$sum:1}}}
])

const result19=await Product.aggregate([
  {
    $group:{
      _id:"$category",
      total:{$sum:1}
    },
    
  },
  {
    $sort:{total:-1}
  }
])

const result20=await Product.aggregate([
  {
    $match:{price:{$lte:100}}
  },
  {
    $project:{
      name:1,
      brand:1
    }
  },
  {
    $count:"Total"
  }
])

const result21=await Product.aggregate([
  {
    $group:{
      _id:"$category",
      totalRevenue:{$sum:{$multiply:["$price","$quantity"]}}
    }
  }
])

const result22=await Product.aggregate([
  {
    $match:{price:{$gt:50}}
  },
  {
    $group:{
      _id:"$category",
      total:{$sum:1}
    }
  },
  {
    $sort:{total:1}
  }
])
// console.log(result2)
// console.log(result3)
// console.log(result4) 
// console.log(result5)
// console.log(result6)
// console.log(result7)
// console.log(result8) 
// console.log(result9)
// console.log(result10)
// console.log(result11)  
// console.log(result12)
// console.log(result13)
// console.log(JSON.stringify(result14,null,2))
// console.log(result15)
// console.log(result16)
// console.log(result17)
// console.log(result18)
// console.log(result19)
// console.log(result20)
// console.log(result21)
console.log(result22)
}
    catch(err){
console.log(err)
    }
  }
  
 
Run();
