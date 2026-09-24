
const jwt = require('jsonwebtoken');

const authenticateToken=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/login.html');
    }
    jwt.verify(token,"Fatma_super_Secret",(err,user)=>{
        if(err){
            return res.redirect('/login.html');
        }
        req.user=user;
        next();
    })
};
module.exports = authenticateToken;
