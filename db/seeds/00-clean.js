exports.seed = function(knex, Promise) {

  const tablesToClean = ['roles']

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
