const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
//authentication logic
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        //console.log("recived credentials",username,password);
        const user=await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:"Invalid username"});
        }
        const isPasswordmatch=user.comparePassword(password)
        if(isPasswordmatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect password"});
        }
    }catch(error){
        return done(error);
    }
}))
module.exports=passport;