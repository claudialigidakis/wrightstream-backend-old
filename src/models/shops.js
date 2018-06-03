const knex = require('../../db');
const bcrypt = require('bcrypt-as-promised')

function getShopByName(shopName) {
  return (
    knex('shops')
  .where({shop_name: shopName})
  .first())
}

function getOneShop(shopsId) {
  return (
    knex('shops')
    .where({id: shopsId})
    .first())
}

function getAllShops(){
  return (
    knex('shops')
    .first()
  )
}

function createShop(body) {
  let shopName = body.shop_name
  return getShopByName(shopName)
  .then(data => {
    if (data)
      throw {
        status : 400,
        message: 'Shop exists'
      }
    return (
      knex('shops')
      .insert({shop_name: shopName})
      .returning('*'))
  })
}

function updateShop(shopsId, shop_name, logo, settings) {
  return (
    knex('shops')
    .update({shop_name, settings, logo})
    .where({id: shopsId})
    .returning('*'))
  .then(([data]) => {
    return data
  })
}

function removeShop(shopsId) {
  return (
    knex('items_supplies')
  .innerJoin('items', 'items.id', 'items_supplies.item_id')
  .where({shop_id: shopsId})
  .del())
  .then(data => {
    return (knex('items').where({shop_id: shopsId}).del())
  }).then(data => {
    return (knex('items').innerJoin('categories', 'items.category_id', 'categories.id').where({shop_id: shopsId}).del())
  }).then(data => {
    return (knex('categories').where({shop_id: shopsId}).del())
  }).then(data => {
    return (knex('staff').where({shops_id: shopsId}).del())
  }).then(data => {
    return (knex('shops').where({id: shopsId}).del())
  })
}

//Staff Routing//
function getOneStaff(staffId, shopId) {
  return (knex('staff').where({id: staffId, shops_id: shopId}).first())
}

function getStaffByEmail(staffEmail) {
  return (knex('staff').where({email: staffEmail}).first())
}

function getAllStaff(shopId) {
  return (knex('staff')
  .where({shops_id: shopId})
)
}

function createStaff(body, ShopId) {
  let password = body.password
  let first_name = body.fname
  let last_name = body.lname
  let staffEmail = body.email
  let photo_url = body.photo
  let shopId = ShopId
  let role = body.role || 1
  return getStaffByEmail(staffEmail).then(data => {
    if (data)
      throw {
        status : 400,
        message: 'Staff member already exists'
      }
    return bcrypt.hash(password, 10)
  }).then(newPassword => {
    return (knex('staff').insert({
      shops_id: shopId,
      role_id: role,
      first_name: first_name,
      last_name: last_name,
      email: staffEmail,
      password: newPassword,
      photo: photo_url
    }).returning('*'))
  }).then(function([
    {
      password,
      ...data
    }
  ]) {
    return data
  })
}

function updateStaff(staffId, first_name, last_name, unhashed_password, email, photo, role) {
  return bcrypt.hash(unhashed_password, 10).then(password => {
    return (knex('staff').update({
      role,
      first_name,
      last_name,
      password,
      email,
      photo
    }).where({id: staffId}).returning('*'))
  }).then(function([
    {
      password,
      ...data
    }
  ]) {
    return data
  })
}

function removeStaff(staffId) {
  return (
    knex('staff')
    .where({id: staffId})
    .del())
}

module.exports = {
  getAllShops,
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
