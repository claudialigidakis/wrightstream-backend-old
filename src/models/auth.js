const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')
const shopModel = require('./shops')

function login(email, password){
  let user
  return shopModel.getStaffByEmail(email)
  .then(function(data){
    if(!data) throw { status: 400, message: "Bad Request"}
    user = data
    return bcrypt.compare(password, data.password)
  })
  .catch(bcrypt.MISMATCH_ERROR, function(){
    throw { status: 401, message: "Unauthorized"}
  })
  .then(([{ password, ...data }]) {
    return user
  })
}

module.exports = { login }
