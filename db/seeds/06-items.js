
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, name: 'Chocolate Cupcake', shop_id: 1, stock_qty: 6, steps: '[]', category_id: 1},
        {id: 2, name: 'Vanilla Cupcake', shop_id: 1, stock_qty: 6, steps: '[]', category_id: 1},
        {id: 3, name: 'Strawberry Cake', shop_id: 1, stock_qty: 0, steps: '[]', category_id: 2},
        {id: 4, name: 'Vanilla Cake', shop_id: 1, stock_qty: 7, steps: '[]', category_id: 2},
        {id: 5, name: 'Chocolate Cake', shop_id: 1, stock_qty: 10, steps: '[]', category_id: 2},
        {id: 6, name: 'Chocolate Cookies', shop_id: 1, stock_qty: 3, steps: '[]', category_id: 3},
        {id: 7, name: 'SnickerDoodles', shop_id: 1, stock_qty: 2, steps: '[]', category_id: 3},
        {id: 8, name: 'Sugar Cookies', shop_id: 1, stock_qty: 5, steps: '[]', category_id: 3},
        {id: 9, name: 'Fruit Cakes', shop_id: 1, stock_qty: 3, steps: '[]', category_id: 2},
        {id: 10, name: 'Cutting Knife', shop_id: 1, stock_qty: 12, steps: '[]', category_id: 4},
        {id: 11, name: 'Glazed Donuts', shop_id: 1, stock_qty: 5, steps: '[]', category_id: 6},
        {id: 12, name: 'Chocolate Donuts', shop_id: 1, stock_qty: 8, steps: '[]', category_id: 6},
        {id: 13, name: 'Creme Donuts', shop_id: 1, stock_qty: 14, steps: '[]', category_id: 6},
        {id: 14, name: 'Blueberry Muffins', shop_id: 1, stock_qty: 17, steps: '[]', category_id: 5},
        {id: 15, name: 'Baklava', shop_id: 1, stock_qty: 13, steps: '[]'},
        {id: 16, name: 'Candle Sticks', shop_id: 1, stock_qty: 40, steps: '[]', category_id: 4},
        {id: 17, name: 'Banana Muffins', shop_id: 1, stock_qty: 11, steps: '[]', category_id: 5},
        {id: 18, name: 'Cinnamon Cookies', shop_id: 1, stock_qty: 9, steps: '[]', category_id: 3},
        {id: 19, name: 'Raspberry Donuts', shop_id: 1, stock_qty: 4, steps: '[]', category_id: 6},
        {id: 20, name: 'Red Velvet Cupcakes', shop_id: 1, stock_qty: 6, steps: '[]', category_id: 1}
      ]);
    });
};
