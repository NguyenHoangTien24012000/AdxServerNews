const {check} = require('./JWT');
let isAuth = async (req, res, next) =>{
      var token = req.headers.authorization;
      if(token){
        try {
            var autData = await check(token)
            req.auth = autData;
            next();
        } catch (error) {
            return res.status(400).send(error)
        }
      }else{
        return res.send({data: "Token invalid!!"});
      }
}

module.exports = isAuth;