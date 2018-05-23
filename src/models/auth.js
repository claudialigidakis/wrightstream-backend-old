const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')
const staffModel = require('./staff')

function login(email, password){
  let staff
  return staffModel.getStaffByEmail(email)
  .then(function(data){
    if(!data) throw { status: 400, message: "Bad Request"}
    staff = data
    return bcrypt.compare(password, data.password)
  })
  .catch(bcrypt.MISMATCH_ERROR, function(){
    throw { status: 401, message: "Unauthorized"}
  })
  .then(function(){
    delete staff.password
    return staff
  })
}

module.exports = {
  login
}
