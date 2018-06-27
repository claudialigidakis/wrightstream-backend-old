exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_supplies').del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases_supplies').insert([
        {purchase_id: 1, supplies_id: 1, supplies_qty: 1, supplies_measurement: 'cup', completed: false}
      ])
    })
};
