const jwt = require('jsonwebtoken');
module.exports = ((req,res,next) => {
  const autho = req.get("authorization")
  let token = ''
  if(autho && autho.toLocaleLowerCase().startsWith("bearer")) {
    token = autho.substring(7)
      next()
    }
  const tokenDecoded = jwt.verify(token,process.env.SECRET)
  if(!tokenDecoded) return res.send("Te falta acceso")
}) 