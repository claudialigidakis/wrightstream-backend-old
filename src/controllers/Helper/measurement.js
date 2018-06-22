const helperModel = require('../../models/Helper/measurement')
var convert = require('convert-units')

function volume(req, res, next) {
  const volumeMeasures = convert().possibilities('volume')
  res.status(200).send({volumeMeasures})
}

function length(req, res, next) {
  const lengthMeasures = convert().possibilities('length')
  res.status(200).send({lengthMeasures})
}

function mass(req, res, next) {
  const massMeasures = convert().possibilities('mass')
  res.status(200).send({massMeasures})
}

function predictor(req, res, next) {
  if (!req.body) {
    return next({status: 400, message: 'Need proper supplies inputs'})
  }
  helperModel.predictor(req.body)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}


module.exports = {
  volume,
  length,
  mass,
  predictor
}
