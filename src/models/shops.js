const knex = require('../../db/knex');
const bcrypt = require('bcrypt')

function getShopByName(shopName) {
  return (knex('shops')
  .where({shop_name: shopName})
  .first())
}

function getOneShop(shopsId) {
  return (knex('shops')
  .where({id: shopsId})
  .first())
}

function createShop(body) {
  console.log(body, "made it to createShop models")
  let shopName = body.shop_name
  let logo_url = body.logoURL
  let email = body.email
  var newShopId = ''

  return getShopByName(shopName).then(data => {
    console.log("made it back from getShopByName")
    if (data) throw {status : 400, message: 'Shop exists'}
    return (
      knex('shops')
      .insert({
        shop_name: shopName,
        logo_url: logo_url
      })
      .returning('*'))
  }).then(data => {
    let newShopId = data[0].id
    return createStaff(body, newShopId)
  }).then(function([{ password, ...data }]) {
    return data
  })
}

function updateShop() {

}

function removeShop(shopsId) {
  return (
  knex('staff')
  .where({shops_id: shopsId})
  .del()
)
.then(data =>{
  return (
    knex('shops')
    .where({id: shopsId})
    .del()
  )
})
}

//user routes

function getStaffByEmail(email) {
  console.log(email, "made it to getStaffByEmail")
  let staffEmail = email
  return (knex('staff').where({email: staffEmail}).first())
}

function createStaff(body, newShopId) {
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

function getOneStaff(staffId, shopId) {
  return (
    knex('staff')
    .where({
    id: staffId,
    shops_id: shopId
  })
  .first())
}

function getAllStaff(shopId) {
  return (
    knex('staff')
  .where({shops_id: shopId})
  .first())
}

function updateStaff() {

}

function removeStaff(staffId) {
  return (knex('staff')
  .where({id: staffId})
  .del())
}

module.exports = {
  getOneShop,
  createShop,
  removeShop,
  updateShop,
  createStaff,
  getAllStaff,
  getOneStaff,
  updateStaff,
  removeStaff
}
