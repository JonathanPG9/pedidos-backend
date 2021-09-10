const jwt = require('jsonwebtoken');
module.exports = ((req,res,next) => {

  const autho = req.get("authorization")
  let token = ''
  if(autho && autho.toLocaleLowerCase().startsWith("bearer")) {
    token = autho.substring(7)
}
  const tokenDecoded = jwt.verify(token,process.env.SECRET)
  if(!tokenDecoded) return res.send("te falta acceso")
  next()
}) 