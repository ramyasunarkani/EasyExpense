const jwt =require('jsonwebtoken');
const User=require('../models/userModel');

const Authenticate=(req,res,next)=>{
    try {
        const token=req.header('Authorization')
        console.log(token);
        const user=jwt.verify(token,'secretkey');
        console.log('user Id >>>>>',user.userID);
        User.findByPk(user.userID).then(usr=>{
            console.log(JSON.stringify(usr));
            req.user=usr;
            next();
        }).catch(err=>{throw new Error(err)})
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false})
        
    }
}


module.exports={Authenticate};