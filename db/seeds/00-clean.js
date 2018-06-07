exports.seed = function(knex, Promise) {

  const tablesToClean = ['purchases_bundles', 'purchases_items', 'purchases_statuses', 'purchases', 'products', 'stores', 'items_supplies', 'supplies', 'bundles_items', 'bundles', 'items', 'sources', 'kinds', 'type', 'categories', 'staff', 'shops', 'roles']

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
