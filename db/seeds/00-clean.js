exports.seed = function(knex, Promise) {

  const tablesToClean = ['orders_supplies', 'supplies_status', 'orders', 'order_status', 'lists_items', 'lists', 'purchases_supplies', 'purchases_bundles', 'purchases_items', 'purchases_statuses', 'purchases', 'products', 'stores', 'items_supplies', 'supplies', 'bundles_items', 'bundles', 'items', 'sources', 'kinds', 'type', 'categories', 'staff', 'shops', 'roles']

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
