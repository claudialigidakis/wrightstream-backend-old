exports.seed = function(knex, Promise) {
  return knex('purchases_supplies').del()
    .then(function () {
      return knex('purchases_supplies').insert([
        {purchase_id: 1, supplies_id: 1, supplies_qty: 1.49, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 1, supplies_id: 2, supplies_qty: 1.27, supplies_measurement: 'qt', completed: false},
        {purchase_id: 1, supplies_id: 3, supplies_qty: 1.25, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 1, supplies_id: 4, supplies_qty: 2, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 1, supplies_id: 7, supplies_qty: 1.33, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 1, supplies_id: 8, supplies_qty: 2.67, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 1, supplies_id: 9, supplies_qty: 1.5, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 1, supplies_id: 10, supplies_qty: 1.13, supplies_measurement: 'cup', completed: false},
        {purchase_id: 1, supplies_id: 11, supplies_qty: 5.17, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 1, supplies_id: 12, supplies_qty: 12, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 1, supplies_id: 13, supplies_qty: 2, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 1, supplies_id: 14, supplies_qty: 2.5, supplies_measurement: 'tsp', completed: false},

        {purchase_id: 2, supplies_id: 1, supplies_qty: 1, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 2, supplies_id: 2, supplies_qty: 1.33, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 2, supplies_id: 3, supplies_qty: 1.5, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 2, supplies_id: 4, supplies_qty: 1, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 2, supplies_id: 7, supplies_qty: 2, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 2, supplies_id: 8, supplies_qty: 1.33, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 2, supplies_id: 10, supplies_qty: 6, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 2, supplies_id: 11, supplies_qty:8.33, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 2, supplies_id: 12, supplies_qty: 1.5, supplies_measurement: 'cup', completed: false},
        {purchase_id: 2, supplies_id: 13, supplies_qty: 1.33, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 2, supplies_id: 14, supplies_qty: .5, supplies_measurement: 'tsp', completed: false},

        {purchase_id: 3, supplies_id: 1, supplies_qty: 1.5, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 3, supplies_id: 2, supplies_qty: 2, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 3, supplies_id: 3, supplies_qty: 2.5, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 3, supplies_id: 4, supplies_qty: 1.5, supplies_measurement: 'tsp', completed: false},
        {purchase_id: 3, supplies_id: 7, supplies_qty: 1, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 3, supplies_id: 8, supplies_qty: 2, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 3, supplies_id: 10, supplies_qty: 9, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 3, supplies_id: 11, supplies_qty: 12.5, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 3, supplies_id: 12, supplies_qty: 1.13, supplies_measurement: 'pnt', completed: false},
        {purchase_id: 3, supplies_id: 13, supplies_qty: 2, supplies_measurement: 'Tbs', completed: false},
        {purchase_id: 3, supplies_id: 14, supplies_qty: .75, supplies_measurement: 'tsp', completed: false}
      ])
    })
};
