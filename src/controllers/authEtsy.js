const authEtsyModel = require('../models/authEtsy')
const shopModel = require('../models/shops')
const db = require('../../db')

async function getLogin(req, res, next){
  try{
    const requestTokens = await authEtsyModel.getOAuthRequestToken(req.claim.shops_id)
    const [ updatedShop ] = await db('shops').update({tokenSecret: requestTokens.tokenSecret}).where({id:req.claim.shops_id}).returning('*')

    if(req.claim.role_id !== 1){
      return next({status:403, message: "Not admin"})
    }
    else if(updatedShop.accessToken && updatedShop.accessTokenSecret) {
      return res.status(200).send({loginUrl: '' })
    }
    else {
      return res.status(200).send({loginUrl: requestTokens.options.login_url })
    }
  }
  catch(err){
    next(err)
  }
}


async function etsyRequestToken(req, res, next){
  try {
    const tokens = await authEtsyModel.getOAuthAccessToken(req.claim.shops_id, req.body.oauth_token, req.body.oauth_verifier)
    const shop = await authEtsyModel.setAccessToken(req.claim.shops_id, tokens.accessToken, tokens.accessTokenSecret)
    return res.sendStatus(200)
  }
  catch(err){
    next(err)
  }
}

async function withEtsyTokens(req, res, next){
  try{
    const shop = await db('shops').where({id: req.claim.shops_id}).first()

    if(!shop.accessToken && !shop.accessTokenSecret){
      return next({ status: 403, message: 'Etsy Access Tokens Not Available' })
    }

    req.etsyTokens = { accessToken: shop.accessToken, accessTokenSecret: shop.accessTokenSecret }

    next()
  }
  catch(err){
    next(err)
  }
}



module.exports = {
  getLogin,
  etsyRequestToken,
  withEtsyTokens
}
