const express=require('express');
const router=express.Router();
const Person=require('./../models/Person')
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
//post a route to add a person
router.post('/signup',async (req,res)=>{
  try{
    const data=req.body//assuming that request body contains the person data

  //create a person docmt with mongoose model
  const newPerson= new Person(data);

  // save the new person to the databse
  const response= await newPerson.save();
  console.log("data saved");

  const payload={
    id: response.id,
    username:response.username
  }
  console.log(JSON.stringify(payload))
  const token=generateToken(payload);
  console.log("Token is"+token);

  res.status(200).json({response:response,token:token});
  }
  catch(err){
    console.log(err);
  res.status(500).json('Internal server error');
  }
})

//Login route
router.post('/login',async(req,res)=>{
  try{
    //extract username and password from the request body
    const {username,password}=req.body;
    
    //find the user by the username
    const user= await Person.findOne({username:username})

    //if ussr does not exist or passwor dwrong then return error
    if(!user || !(await user.comparePassword(password))){
      res.status(401).json({error:"Invalid username or password"})
    }

    //generate token
    const payload={
      id:user.id,
      username:user.username

    }
    const token=generateToken(payload)
    //return token as response
    res.json(token)
  }catch(error){
    res.status(500).json({error:"Internal server error"})
  }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log("user data: ", req.user);

    const userId=req.user.userData.id;
    const user=await Person.findById(userId);
    res.status(200).json({user});
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
})

//GET method to get the person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
  try{
    const response=await Person.find();
    console.log("data fetched");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})
//GET method to get the person with worktype
router.get('/:workType',async (req,res)=>{
  try{
    const workType=req.params.workType;
  if(workType=='waiter'|| workType=='chef' || workType=='manager'){
    const response=await Person.find({work:workType});
    console.log("Data Fetched");
    res.status(200).json(response);
  }
  else{
    res.status(404).json("Invalid work type");
  }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})

module.exports=router;
