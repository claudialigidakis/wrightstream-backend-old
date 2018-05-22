const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
// const passport = require('passport')
// const EtsyStrategy = require('passport-etsy').Strategy
// const cookieSession = require('cookie-session')
// const cookieParser = require('cookie-parser')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
//
// app.use(cookieSession({
//     secret: 'keyboardcat'
//
//   }));
//
//
// passport.use(new EtsyStrategy({
//     consumerKey: 'xdr1slzhyyszqryd0rulflf9',
//     consumerSecret: 'ya26ek0vi1',
//     callbackURL: 'http://127.0.0.1:3000/auth/etsy/callback'
//   },
//   function (token, tokenSecret, profile, done){
//     console.log(token)
//     // User.findOrCreate({etsyID: profile.id})
//   }
// ));
//
//
// app.use(passport.initialize())
// app.use(passport.session())
//
// passport.serializeUser(function (object, done) {
//   console.log("serializeUser", {token: object})
//   done(null, {token: object.token});
// });
// passport.deserializeUser(function (object, done) {
//   console.log("deserializeUser", object)
//   done(null, object);
// });
//
//
// app.get('/login', passport.authenticate('etsy'));
//
// app.get('/auth/etsy/callback', passport.authenticate('etsy', {
//   failureRedirect: '/back',
//   successRedirect: '/home'
//   })
// );
//
// app.get('/home', function(req, res, next){
//   console.log("made it home")
// })
//
// app.get('/back', function(req, res, next){
//   console.log("made it back to login")
// })
//

//user routes
app.use('/shops', require('./routes/shops'))
app.use('/auth', require('./routes/auth'))


//////////////////////////////////////////////////////////////////////////////
// example routes, not part of an organized application
//////////////////////////////////////////////////////////////////////////////
app.get('/protected',
        authController.isAuthenticated,
        function(req, res, next){ res.send({ id: req.claim.id, message: "For authenticated eyes only" }) })

app.get('/protected/:userId',
        authController.isAuthenticated,
        authController.isSelf,
        function(req, res, next){ res.send({ id: req.claim.id, message: "For your eyes only"}) })


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

res.status(errorMessage.status).send(errorMessage)
})

//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
