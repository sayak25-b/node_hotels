const mongoose=require('mongoose')

//Define the mongodb connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //replace hotels by any name because it's a database name

//Set up mongodb Connection
mongoose.connect(mongoURL,{
    //useNewUrlParser:true,
    //useUnifiedTopology:true
})

//get default connection
//Mongoose maintains a default connection object representing the Mongodb connection
const db=mongoose.connection;

//define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to mongoDB server');
})
db.on('disconnected',()=>{
    console.log('Disconnected to mongoDB server');
})
db.on('error',(err)=>{
    console.error('Mongodb connection error',err);
})

//export the database connection
module.exports=db;