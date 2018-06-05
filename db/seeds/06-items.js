
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, name: 'Chocolate Cupcake', shop_id: 1, stock_qty: 6, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 1, photo:'https://www.recipetineats.com/wp-content/uploads/2017/05/Chocolate-Cupcakes12-landscape.jpg'},
        {id: 2, name: 'Vanilla Cupcake', shop_id: 1, stock_qty: 6, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 1, photo:'http://redonline.cdnds.net/main/thumbs/2101/1372752153-vanilla-cupcakes-with-swirly-icing-mary-berry-s-cookery-course__square.jpg'},
        {id: 3, name: 'Strawberry Cake', shop_id: 1, stock_qty: 0, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 2, photo:'https://tatyanaseverydayfood.com/wp-content/uploads/2015/10/Strawberry-Champagne-Cake.jpg'},
        {id: 4, name: 'Vanilla Cake', shop_id: 1, stock_qty: 7, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 2, photo:'https://img1.southernliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/11/main/2546901_south_46_main-slice_0.jpg?itok=I0Ii0_8R'},
        {id: 5, name: 'Chocolate Cake', shop_id: 1, stock_qty: 10, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 2, photo:'http://www.trbimg.com/img-56b2a3d0/turbine/la-fo-proof-chocolate-cake-photos-012/'},
        {id: 6, name: 'Chocolate Cookies', shop_id: 1, stock_qty: 3, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 3, photo:'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/200902-xl-milk-chocolate-cookies-with-malted-cream.jpg?itok=Dt7vktKc'},
        {id: 7, name: 'SnickerDoodles', shop_id: 1, stock_qty: 2, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 3, photo:'https://sallysbakingaddiction.com/wp-content/uploads/2016/08/soft-caramel-snickerdoodles-1.jpg'},
        {id: 8, name: 'Sugar Cookies', shop_id: 1, stock_qty: 5, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 3, photo:'https://d2gk7xgygi98cy.cloudfront.net/4241-3-large.jpg'},
        {id: 9, name: 'Fruit Cakes', shop_id: 1, stock_qty: 3, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 2, photo:'http://foodandfam.com/wp-content/uploads/2014/06/Pound-Cake-Fruit.jpg'},
        {id: 10, name: 'Cutting Knife', shop_id: 1, stock_qty: 12, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 4, photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlHKM-_kAO5ajXvFWAX2xbzqvGbuyJflGSPxL1f6xmCJsAqaMUg'},
        {id: 11, name: 'Glazed Donuts', shop_id: 1, stock_qty: 5, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 6, photo:'https://i.pinimg.com/originals/4f/16/e5/4f16e51f7430ce9a7efe802e1c30439c.jpg'},
        {id: 12, name: 'Chocolate Donuts', shop_id: 1, stock_qty: 8, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 6, photo:'https://www.crunchycreamysweet.com/wp-content/uploads/2016/02/chocolate-donuts-1.jpg'},
        {id: 13, name: 'Creme Donuts', shop_id: 1, stock_qty: 14, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 6, photo:'http://www.marystestkitchen.com/wp-content/uploads/2017/08/ft-vegan-boston-cream-dooughnuts-bitten.jpg'},
        {id: 14, name: 'Blueberry Muffins', shop_id: 1, stock_qty: 17, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 5, photo:'https://static01.nyt.com/images/2016/05/03/dining/03COOKING-JORDANMARSHMUFFIN2/03COOKING-JORDANMARSHMUFFIN2-articleLarge.jpg'},
        {id: 15, name: 'Baklava', shop_id: 1, stock_qty: 13, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVwtGpxSIJvox3Wb1Q4w0bfUKVmgGdGRTyDSLJSWYjP-w1leeFQ'},
        {id: 16, name: 'Candle Sticks', shop_id: 1, stock_qty: 40, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 4, photo:'https://i.pinimg.com/736x/79/75/3a/79753a77684486d7e22b9d8225e2d831--candle-holders-bees.jpg'},
        {id: 17, name: 'Banana Muffins', shop_id: 1, stock_qty: 11, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 5, photo:'https://www.mrbreakfast.com/images/755_muffins_with_banana.jpg'},
        {id: 18, name: 'Cinnamon Cookies', shop_id: 1, stock_qty: 9, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 3, photo:'https://www.recipegirl.com/wp-content/uploads/2013/02/Cinnamon-Vanilla-Monster-Cookies.jpg'},
        {id: 19, name: 'Raspberry Donuts', shop_id: 1, stock_qty: 4, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 6, photo:'https://avirtualvegan.com/wp-content/uploads/2017/02/Vegan-Raspberry-Donuts-6T.jpg'},
        {id: 20, name: 'Red Velvet Cupcakes', shop_id: 1, stock_qty: 6, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', category_id: 1, photo:'https://www.recipethis.com/wp-content/uploads/Airfryer-Red-Velvet-Cupcake-Heaven.jpg'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('items_id_seq', (SELECT MAX(id) FROM items));"
      );
    });
};
