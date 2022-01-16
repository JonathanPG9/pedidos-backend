const mercadopago = require('mercadopago'),
      {Router} = require('express'),
      router = Router();

mercadopago.configure({
  access_token: "APP_USR-1095712046388721-011608-f577ab0bec517afb71203f1fde3babc0-1057820087",
});

router.post("/mercadopago", (req,res) => {
  const preference = {
    items : req.body
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body)
      res.send(response.body)
    })
    .catch(function (error) {
      console.log(error);
    });
})
module.exports = router;