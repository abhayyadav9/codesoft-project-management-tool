const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/signup", async(req,res)=> {
    try{
    const {username} = req.body; //we are destructuring
    const {email} = req.body;
    const existinguser = await User.findOne({username : username});
    const existingemail = await User.findOne
    ({email : email});
    if(existinguser){
        return res.status(400).json({message:"Username already exists"});
    }else if(username.length< 4){
        return res.status(400).json({message:"Username should have atleast 4 characters"});
    }
    if(existingemail){
        return res.status(400).json({message: "Email already exists"});
    }
    const hashpass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username:req.body.username, 
        email:req.body.email,
        password: hashpass,
    });
    await newUser.save();
    return res.status(200).json({message:"Sign In successful"});
}
catch(error){
    console.log(error);
    res.status(400).json({message: "Internal server error"});
}
});



router.post("/login", async(req,res)=>{
    const {username,password} = req.body;
    const existinguser = await User.findOne({username: username});
    if(!existinguser){
        return res.status(400).json({message:"Username or password is incorrect"});
    }
    bcrypt.compare(password,existinguser.password,(err,data)=>{
        if(data){
            const authClaims =[{name: username},{jti:jwt.sign({},"KskTM")}]
            const token = jwt.sign({authClaims}, "KskTM",{expiresIn:"2d"});
            res.status(200).json({id: existinguser._id, token:token});
        }else{
            return res.status(400).json({message:"Invalid credentials"});

        }
    })
});
module.exports = router;