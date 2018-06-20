const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const EtsyStrategy = require('passport-etsy').Strategy
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')



if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}


const app = express()



app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());
//user routes

app.use('/shops', require('./routes/Shop/shops'))
app.use('/auth', require('./routes/Shop/auth'))
app.use('/auth/etsy', require('./routes/Shop/authEtsy'))
app.use('/etsy', require('./routes/Shop/etsy'))
app.use('/stores', require('./routes/Shop/stores'))


app.use('/purchases', require('./routes/WorkStream/purchases'))
app.use('/purchases_statuses', require('./routes/WorkStream/purchases_statuses'))
app.use('/purchases_items', require('./routes/WorkStream/purchases_items'))
app.use('/purchases_bundles', require('./routes/WorkStream/purchases_bundles'))

app.use('/inventory', require('./routes/Inventory/inventory'))
app.use('/orders', require('./routes/Inventory/orders'))
app.use('/lists', require('./routes/Inventory/lists'))

app.use('/products', require('./routes/Products/products'))
app.use('/bundles', require('./routes/Products/bundles'))
app.use('/categories', require('./routes/Products/categories'))
app.use('/items', require('./routes/Products/items'))
app.use('/kinds', require('./routes/Products/kinds'))
app.use('/sources', require('./routes/Products/sources'))
app.use('/supplies', require('./routes/Products/supplies'))
app.use('/types', require('./routes/Products/types'))


app.use('/helper', require('./routes/Helper/measurement'))


//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////
app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})

//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next){
  console.log(err)
  const errorMessage = {}

  if(process.env.NODE_ENV !== 'production' && err.stack)
  errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'
  console.log(errorMessage)
  res.status(errorMessage.status).send(errorMessage)
})

//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
