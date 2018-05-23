const knex = require('../../db');
const bcrypt = require('bcrypt-as-promised')
const staffModel = require('./staff')

function getShopByName(shopName) {
  return (knex('shops')
  .where({shop_name: shopName})
  .first())
}

function getOne(shopsId) {
  return (knex('shops')
  .where({id: shopsId})
  .first())
}

function create(body) {
  console.log(body, "made it to createShop models")
  let shopName = body.shop_name
  let logo_url = body.logoURL
  let email = body.email
  var newShopId = ''
  return getShopByName(shopName).then(data => {
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
    return staffModel.create(body, newShopId)
  }).then(function([{ password, ...data }]) {
    return data
  })
}

function update() {

}

function remove(shopsId) {
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

module.exports = {
  getOne,
  create,
  remove,
  update
}
