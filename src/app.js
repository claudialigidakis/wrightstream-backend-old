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

app.use('/shops', require('./routes/shops'))
app.use('/auth', require('./routes/auth'))
app.use('/auth/etsy', require('./routes/authEtsy'))
app.use('/etsy', require('./routes/etsy'))

app.use('/stores', require('./routes/stores'))
app.use('/products', require('./routes/products'))
app.use('/purchases', require('./routes/purchases'))
app.use('/purchases_statuses', require('./routes/purchases_statuses'))
app.use('/purchases_items', require('./routes/purchases_items'))
app.use('/purchases_bundles', require('./routes/purchases_bundles'))


app.use('/bundles', require('./routes/bundles'))
app.use('/categories', require('./routes/categories'))
app.use('/items', require('./routes/items'))
app.use('/kinds', require('./routes/kinds'))
app.use('/sources', require('./routes/sources'))
app.use('/supplies', require('./routes/supplies'))
app.use('/types', require('./routes/types'))


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
