exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_bundles').del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases_bundles').insert([
        {purchase_id: 1, bundle_id: 1, bundle_qty: 1, completed: false},
        {purchase_id: 2, bundle_id: 1, bundle_qty: 2, completed: false},
        {purchase_id: 3, bundle_id: 1, bundle_qty: 3, completed: false},
      ])
    })
};
