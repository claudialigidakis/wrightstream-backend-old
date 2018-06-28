
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items_supplies').del()
    .then(function () {
      // Inserts seed entries
      return knex('items_supplies').insert([
        {qty: 1, qty_measure: 'cup', item_id: 1, supplies_id: 1},
        {qty: 1.33, qty_measure: 'cup', item_id: 1, supplies_id: 2},
        {qty: .75, qty_measure: 'tsp', item_id: 1, supplies_id: 3},
        {qty: .5, qty_measure: 'tsp', item_id: 1, supplies_id: 4},
        {qty: 1, qty_measure: 'unit', item_id: 1, supplies_id: 7},
        {qty: 2, qty_measure: 'unit', item_id: 1, supplies_id: 8},
        {qty: 3, qty_measure: 'Tbs', item_id: 1, supplies_id: 10},
        {qty: 12.5, qty_measure: 'tsp', item_id: 1, supplies_id: 11},
        {qty: .75, qty_measure: 'cup', item_id: 1, supplies_id: 12},
        {qty: 2, qty_measure: 'tsp', item_id: 1, supplies_id: 13},
        {qty: .25, qty_measure: 'tsp', item_id: 1, supplies_id: 14},

        {qty: .66, qty_measure: 'cup', item_id: 2, supplies_id: 1},
        {qty: 1.25, qty_measure: 'cup', item_id: 2, supplies_id: 2},
        {qty: 1, qty_measure: 'tsp', item_id: 2, supplies_id: 3},
        {qty: .5, qty_measure: 'tsp', item_id: 2, supplies_id: 4},
        {qty: 1, qty_measure: 'unit', item_id: 2, supplies_id: 7},
        {qty: 2, qty_measure: 'unit', item_id: 2, supplies_id: 8},
        {qty: 1, qty_measure: 'cup', item_id: 2, supplies_id: 9},
        {qty: 5, qty_measure: 'Tbs', item_id: 2, supplies_id: 10},
        {qty: 1, qty_measure: 'tsp', item_id: 2, supplies_id: 11},
        {qty: .75, qty_measure: 'tsp', item_id: 2, supplies_id: 14},

        {qty: 18, qty_measure: 'oz', item_id: 3, supplies_id: 15},
        {qty: 3, qty_measure: 'oz', item_id: 3, supplies_id: 16},
        {qty: 1, qty_measure: 'cup', item_id: 3, supplies_id: 17},
        {qty: 1, qty_measure: 'cup', item_id: 3, supplies_id: 18},
        {qty: .5, qty_measure: 'cup', item_id: 3, supplies_id: 1},
        {qty: 4, qty_measure: 'unit', item_id: 3, supplies_id: 8},

        {qty: 6, qty_measure: 'Tbs', item_id: 4, supplies_id: 10},
        {qty: 3, qty_measure: 'cup', item_id: 4, supplies_id: 2},
        {qty: 1, qty_measure: 'Tbs', item_id: 4, supplies_id: 13},
        {qty: .5, qty_measure: 'tsp', item_id: 4, supplies_id: 11},
        {qty: 1.25, qty_measure: 'cup', item_id: 4, supplies_id: 9},
        {qty: 4, qty_measure: 'unit', item_id: 4, supplies_id: 8},
        {qty: 1, qty_measure: 'Tbs', item_id: 4, supplies_id: 3},
        {qty: 1.25, qty_measure: 'cup', item_id: 4, supplies_id: 1},

        {qty: 2, qty_measure: 'cup', item_id: 5, supplies_id: 9},
        {qty: 1.75, qty_measure: 'cup', item_id: 5, supplies_id: 2},
        {qty: .75, qty_measure: 'cup', item_id: 5, supplies_id: 12},
        {qty: 1.5, qty_measure: 'tsp', item_id: 5, supplies_id: 13},
        {qty: 1.5, qty_measure: 'tsp', item_id: 5, supplies_id: 14},
        {qty: 1, qty_measure: 'tsp', item_id: 5, supplies_id: 11},
        {qty: 2, qty_measure: 'unit', item_id: 5, supplies_id: 8},
        {qty: 1, qty_measure: 'cup', item_id: 5, supplies_id: 1},
        {qty: .5, qty_measure: 'cup', item_id: 5, supplies_id: 18},
        {qty: 2, qty_measure: 'tsp', item_id: 5, supplies_id: 19},
        {qty: 2, qty_measure: 'tsp', item_id: 5, supplies_id: 3},

        {qty: 1.25, qty_measure: 'cup', item_id: 6, supplies_id: 10},
        {qty: 2, qty_measure: 'cup', item_id: 6, supplies_id: 9},
        {qty: 2, qty_measure: 'unit', item_id: 6, supplies_id: 8},
        {qty: 2, qty_measure: 'tsp', item_id: 6, supplies_id: 3},
        {qty: 2, qty_measure: 'cup', item_id: 6, supplies_id: 2},
        {qty: .75, qty_measure: 'cup', item_id: 6, supplies_id: 12},
        {qty: 1, qty_measure: 'tsp', item_id: 6, supplies_id: 14},
        {qty: .5, qty_measure: 'tsp', item_id: 6, supplies_id: 11},
        {qty: 2, qty_measure: 'cup', item_id: 6, supplies_id: 22},

        {qty: .5, qty_measure: 'cup', item_id: 7, supplies_id: 10},
        {qty: .75, qty_measure: 'cup', item_id: 7, supplies_id: 9},
        {qty: 1, qty_measure: 'unit', item_id: 7, supplies_id: 8},
        {qty: 1, qty_measure: 'Tbs', item_id: 7, supplies_id: 1},
        {qty: .5, qty_measure: 'tsp', item_id: 7, supplies_id: 3},
        {qty: 1.5, qty_measure: 'cup', item_id: 7, supplies_id: 2},
        {qty: .75, qty_measure: 'tsp', item_id: 7, supplies_id: 13},
        {qty: .25, qty_measure: 'tsp', item_id: 7, supplies_id: 11},
        {qty: 1, qty_measure: 'Tbs', item_id: 7, supplies_id: 19},

        {qty: 2.75, qty_measure: 'cup', item_id: 8, supplies_id: 2},
        {qty: 1, qty_measure: 'tsp', item_id: 8, supplies_id: 14},
        {qty: .5, qty_measure: 'tsp', item_id: 8, supplies_id: 13},
        {qty: 1, qty_measure: 'cup', item_id: 8, supplies_id: 10},
        {qty: 1.5, qty_measure: 'cup', item_id: 8, supplies_id: 9},
        {qty: 1, qty_measure: 'unit', item_id: 8, supplies_id: 8},
        {qty: 1, qty_measure: 'tsp', item_id: 8, supplies_id: 3},

        {qty: 10, qty_measure: 'Tbs', item_id: 9, supplies_id: 10},
        {qty: 1.25, qty_measure: 'cup', item_id: 9, supplies_id: 9},
        {qty: .75, qty_measure: 'cup', item_id: 9, supplies_id: 12},
        {qty: .25, qty_measure: 'tsp', item_id: 9, supplies_id: 11},
        {qty: .5, qty_measure: 'tsp', item_id: 9, supplies_id: 3},
        {qty: 1, qty_measure: 'tsp', item_id: 9, supplies_id: 3},
        {qty: 2, qty_measure: 'unit', item_id: 9, supplies_id: 8},
        {qty: .5, qty_measure: 'cup', item_id: 9, supplies_id: 2},

        {qty: 1, qty_measure: 'unit', item_id: 10, supplies_id: 20},

        {qty: 5, qty_measure: 'cup', item_id: 11, supplies_id: 18},
        {qty: 1, qty_measure: 'cup', item_id: 11, supplies_id: 1},
        {qty: 1, qty_measure: 'unit', item_id: 11, supplies_id: 8},
        {qty: 2, qty_measure: 'cup', item_id: 11, supplies_id: 2},
        {qty: 2, qty_measure: 'Tbs', item_id: 11, supplies_id: 9},
        {qty: 4.5, qty_measure: 'tsp', item_id: 11, supplies_id: 13},
        {qty: .5, qty_measure: 'tsp', item_id: 11, supplies_id: 11},
        {qty: .25, qty_measure: 'cup', item_id: 11, supplies_id: 10},
        {qty: 1, qty_measure: 'cup', item_id: 11, supplies_id: 23},

        {qty: 2.5, qty_measure: 'cup', item_id: 12, supplies_id: 2},
        {qty: 1, qty_measure: 'cup', item_id: 12, supplies_id: 12},
        {qty: 2, qty_measure: 'tsp', item_id: 12, supplies_id: 13},
        {qty: .5, qty_measure: 'tsp', item_id: 12, supplies_id: 14},
        {qty: .25, qty_measure: 'tsp', item_id: 12, supplies_id: 11},
        {qty: 1, qty_measure: 'cup', item_id: 12, supplies_id: 9},
        {qty: .75, qty_measure: 'cup', item_id: 12, supplies_id: 1},
        {qty: 2, qty_measure: 'unit', item_id: 12, supplies_id: 8},
        {qty: .25, qty_measure: 'cup', item_id: 12, supplies_id: 10},
        {qty: 2, qty_measure: 'tsp', item_id: 12, supplies_id: 3},
        {qty: 1, qty_measure: 'cup', item_id: 12, supplies_id: 23},

        {qty: 1, qty_measure: 'unit', item_id: 16, supplies_id: 21}

      ])
    })
};
