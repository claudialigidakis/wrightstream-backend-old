exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases_statuses').insert([
        {purchase_id: 1, status_id: 1, completed: false},
        {purchase_id: 1, status_id: 2, completed: false},
        {purchase_id: 1, status_id: 3, completed: false},
        {purchase_id: 1, status_id: 4, completed: false},
        {purchase_id: 1, status_id: 5, completed: false},
        {purchase_id: 2, status_id: 1, completed: false},
        {purchase_id: 2, status_id: 2, completed: false},
        {purchase_id: 2, status_id: 3, completed: false},
        {purchase_id: 2, status_id: 4, completed: false},
        {purchase_id: 2, status_id: 5, completed: false},
        {purchase_id: 3, status_id: 1, completed: false},
        {purchase_id: 3, status_id: 2, completed: false},
        {purchase_id: 3, status_id: 3, completed: false},
        {purchase_id: 3, status_id: 4, completed: false},
        {purchase_id: 3, status_id: 5, completed: false}
      ])
    })
};
