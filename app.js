let express= require("express");
let app=express();//inisialising
let port=3000;


let cors=require('cors')
let mongo=require('mongodb')
let MongoClient=mongo.MongoClient
let mongoUrl="mongodb://127.0.0.1:27017"
let bodyParser = require("body-parser");
// const { query } = require("express");
let db;
let atlasUrl ="mongodb+srv://testuser:testpassword@cluster0.ob44zma.mongodb.net/nykacart?retryWrites=true&w=majority"
// middleware (supporting library)
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('<h1>Hi from express</h1>')
})
//one more route
app.get('/category',(req,res)=>{
    db.collection('category')
    .find()
   .toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})



 app.get('/datafile',(req,res)=>{
     db.collection('datafile')
     .find()
    .toArray((err,result)=>{
         if(err) throw err;
         res.send(result)
     })
 })





app.get('/datafile/:id',(req,res)=>{
    let query = {};
    let id_ = Number(req.params.id);
    let ratingOne = req.query.rating;
    let nameOne = req.query.name; 
    let priceOne = req.query.price;

    if (nameOne && priceOne) {
        query = {
            category_id: id_,
            name: nameOne,
            price: priceOne
        };
    } else if (nameOne) {
        query = {
            category_id: id_,
            name: nameOne
        };
    } else if(priceOne) {
        query = {
            category_id: id_, 
            price: priceOne
        };
    } else {
        query = {category_id: id_};
    }

    console.log(query);
    db.collection('datafile')
        .find(query)
        .toArray((err,result)=>{
            if(err) throw err;
            res.send(result)
        });
});

//http://localhost:9500/products?category=Gadgets
// app.get('/datafile/:categoryId', (req, res) => {
//     let query = {};
//     let categoryId = req.params.categoryId;
//     console.log(categoryId)
//     let nameOne = req.query.name; 
//     console.log(nameOne);
//     if (nameOne) {
//         query = { category_id:categoryId,
//             name:nameOne};
//     } else {
//         query = {category_id: categoryId};
//     }
//    console.log(query);
//     db.collection('datafile').find(query)
//     .toArray((err,result)=>{
//          if(err) throw err;
//          res.send(result)
     
//     });
// });





// connect with mongodb
MongoClient.connect(atlasUrl,{useNewUrlParser:true},(err,dc)=>{
    if (err) {
   console.log('error while connecting')
    }else {
        db=dc.db ('nykacart');;
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
    
} 
});



