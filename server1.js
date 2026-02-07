//JSON String to object

/*const jsonString = '{"name": "Sayak", "age": 21, "city":"Howrah"}';
const jsonObject=JSON.parse(jsonString);
console.log(jsonObject);*/

//Object to JSON String

/*const objecttoConvert={
    "name":"Sayak",
    "age":21
}
const Json=JSON.stringify(objecttoConvert);
console.log(Json);*/


const express=require('express');
const app = express();
const db=require('./db');
const bodyParser=require('body-parser')
const passport=require('./auth');
//require('./auth')
require('dotenv').config();
const PORT=process.env.PORT || 3000;

app.use(bodyParser.json());
//Middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to:${req.originalUrl}`);
  next();
}
app.use(logRequest)

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});
app.get('/',localAuthMiddleware,(req, res) => {
  res.send('Welcome to my Hotel.....How can I help you?')
})

//Import router file
const personRoutes=require('./routes/personRoutes');
//use the router
app.use('/person',personRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

module.exports=logRequest;