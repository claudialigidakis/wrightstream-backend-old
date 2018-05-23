const staffModel = require('../models/staff')

function getOne(req, res, next){
    console.log("made it to get one staff controller")
  if(!req.params.staffId || !req.body.shopId) {
    return next({ status: 400, message:'No staff ID or Shop Id'})
  }
  staffModel.getOne(req.params.staffId, req.body.shopId)
  .then(data =>{
    delete data.password
    res.status(200).send({ data })
  })
  .catch(next)
}

function getAll(req, res, next){
  if(!req.body.shopId){
    return next({status: 400, message: "No shop body"})
  }
  staffModel.getAll(req.body.shopId)
  .then(data=> {
    res.status(200).send({data})
  })
  .catch(next)
}

function create(req, res, next){
  if(!req.body.shopId || !req.body.fname || ! req.body.lname || !req.body.password || !req.body.email || !req.body.photo || !req.body.role) {
    return next({status:400, message:'Need proper staff inputs'})
  }
  staffModel.create(req.body, parseInt(req.body.shopId))
  .then(data=> {
    delete data.password
    res.status(200).send({ data })
  })
  .catch(next)
}

function update(req, res, next){

}

function remove(req, res, next){
  if(!req.params.staffId){
    return next({ status: 400, message: 'Missing staff member'})
  }
  staffModel.remove(parseInt(req.params.staffId))
  .then(function(data){
    delete data.password
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {getOne, getAll, create, update, remove}
