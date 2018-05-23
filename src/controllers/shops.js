const shopModel = require('../models/shops')


function getOne(req, res, next){
 if(!req.params.shopId) {
   return next({ status: 400, message:'Bad Request'})
 }
 shopModel.getOne(req.params.shopId)
 .then(data =>{
   res.status(200).send({ data })
 })
 .catch(next)
}

function create(req, res, next){
  console.log("made it to createshop route")
  if(!req.body.shop_name){
    return next({ status: 400, message: 'Missing shop creation fields'})
  }
  shopModel.create(req.body)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function update(req, res, next){

}


function remove(req, res, next){
  console.log(req.params)
  if(!req.params.shopId){
    return next({ status: 400, message: 'Missing shop id'})
  }
  shopModel.remove(parseInt(req.params.shopId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}



module.exports = {getOne, create, remove, update}
