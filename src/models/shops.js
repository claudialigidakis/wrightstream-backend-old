const knex = require('../../db');
const bcrypt = require('bcrypt-as-promised')


function getShopByName(shopName) {
  console.log(shopName, "getShopByName models");
  return (
    knex('shops')
  .where({shop_name: shopName})
  .first())
}

function getOneShop(shopsId) {
  return (knex('shops')
  .where({id: shopsId})
  .first())
}

function createShop(body) {
  console.log(body)
  let shopName = body.shop_name
  let logo_url = body.logo_url
  return getShopByName(shopName)
  .then(data => {
    if (data) throw {status : 400, message: 'Shop exists'}
    return (
      knex('shops')
      .insert({
        shop_name: shopName,
        logo_url: logo_url
      })
      .returning('*')
    )
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


//staff routing


function getOneStaff(staffId, shopId) {
  console.log("made it to getonestaff models");
  return (
    knex('staff')
    .where({
    id: staffId,
    shops_id: shopId
  })
  .first())
}

function getStaffByEmail(email) {
  console.log(email, "in getstaffbyemail models");
  let staffEmail = email
  return (
    knex('staff')
  .where({email: staffEmail})
  .first())
}

function getAllStaff(shopId) {
  console.log("made it to getallstaff models");
  return (
    knex('staff')
  .where({shops_id: shopId})
  .first())
}

function createStaff(body, newShopId) {
  console.log(body, newShopId);
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
  getOneStaff,
  getAllStaff,
  createStaff,
  updateStaff,
  removeStaff
}
