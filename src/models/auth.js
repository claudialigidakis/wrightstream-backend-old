const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')
const staffModel = require('./staff')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Login
//
// 1. Check to see if user already exists
//   a. if not, return a 400 with appropriate error message
// 2. compare password in the database with the password provided by user
// 3. If the passwords do not match, respond with 401 Unauthorized
// 4. strip hashed password away from object
// 5. "return/continue" promise
//////////////////////////////////////////////////////////////////////////////

function login(email, password){
  let staff
  // 1. Check to see if user already exists
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
