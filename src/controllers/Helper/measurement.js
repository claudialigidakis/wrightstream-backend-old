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
  
}


module.exports = {
  volume,
  length,
  mass,
  predictor
}
