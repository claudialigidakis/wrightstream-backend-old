exports.seed = function(knex, Promise) {
  return knex('orders_supplies').del()
    .then(function () {
      return knex('orders_supplies').insert([
        {order_id: 1, supply_id: 1, supply_qty: 188.01, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 2, supply_qty: 323, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 3, supply_qty: 119.32, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 1, supply_id: 4, supply_qty: 7.5, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 7, supply_qty: 15, supply_measure_type:'unit', supply_status: 1},
        {order_id: 1, supply_id: 8, supply_qty: 848, supply_measure_type:'unit', supply_status: 1},
        {order_id: 1, supply_id: 9, supply_qty: 140.5, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 10, supply_qty: 707.54, supply_measure_type:'Tbs', supply_status: 1},
        {order_id: 1, supply_id: 11, supply_qty: 112.5, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 1, supply_id: 12, supply_qty: 3, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 13, supply_qty: 112.5, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 1, supply_id: 14, supply_qty: 10.25, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 1, supply_id: 15, supply_qty: 1890, supply_measure_type:'oz', supply_status: 1},
        {order_id: 1, supply_id: 16, supply_qty: 315, supply_measure_type:'oz', supply_status: 1},
        {order_id: 1, supply_id: 17, supply_qty: 103, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 18, supply_qty: 103, supply_measure_type:'cup', supply_status: 1},
        {order_id: 1, supply_id: 19, supply_qty: 6, supply_measure_type:'Tbs', supply_status: 1},

        {order_id: 2, supply_id: 1, supply_qty: 12.5625, supply_measure_type:'cup', supply_status: 1},
        {order_id: 2, supply_id: 2, supply_qty: 31.5, supply_measure_type:'cup', supply_status: 1},
        {order_id: 2, supply_id: 3, supply_qty: 10.5, supply_measure_type:'Tbs', supply_status: 1},
        {order_id: 2, supply_id: 8, supply_qty: 41, supply_measure_type:'unit', supply_status: 1},
        {order_id: 2, supply_id: 9, supply_qty: 13.25, supply_measure_type:'cup', supply_status: 1},
        {order_id: 2, supply_id: 10, supply_qty: 79.2, supply_measure_type:'tbs', supply_status: 1},
        {order_id: 2, supply_id: 11, supply_qty: 5.25, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 2, supply_id: 13, supply_qty: 10.75, supply_measure_type:'tsp', supply_status: 1},
        {order_id: 2, supply_id: 19, supply_qty: 1, supply_measure_type:'Tbs', supply_status: 1},
      ]);
    });
};
