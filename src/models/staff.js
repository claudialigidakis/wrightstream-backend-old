const knex = require('../../db');
const bcrypt = require('bcrypt-as-promised')


function getAll(shopId) {
  return (
    knex('staff')
  .where({shops_id: shopId})
  .first())
}


function getOne(staffId, shopId) {
  return (
    knex('staff')
    .where({
    id: staffId,
    shops_id: shopId
  })
  .first())
}

function getStaffByEmail(email) {
  console.log(email, "made it to getStaffByEmail")
  let staffEmail = email
  return (knex('staff').where({email: staffEmail}).first())
}

function create(body, newShopId) {
  let password = body.password
  let first_name = body.fname
  let last_name = body.lname
  let staffEmail = body.email
  let photo_url = body.photo
  let shopId = newShopId
  let role = body.role || 1
  return getStaffByEmail(staffEmail)
  .then(data => {
    if (data) throw { status : 400, message: 'Staff member already exists'}
    return bcrypt.hash(password, 10)
  }).then(newPassword => {
    return (
      knex('staff')
    .insert({
      shops_id: shopId,
      role_id: role,
      first_name: first_name,
      last_name: last_name,
      email: staffEmail,
      password: newPassword,
      photo: photo_url
    }).returning('*'))
  })
  .then(function([{ password, ...data }]) {
    return data
  })
}


function update() {

}

function remove(staffId) {
  return (knex('staff')
  .where({id: staffId})
  .del())
}


module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}
