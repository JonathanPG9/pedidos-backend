module.exports = ((error,req,res,next) => {
  if(error.name = 'CastError') {
    res.status(400).send({error : ' ups error nuestro'}).end()
  }
  else {
    res.status(500).end()
  }
})