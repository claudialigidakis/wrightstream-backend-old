const authEtsyModel = require('../models/authEtsy')
const shopModel = require('../models/shops')
const db = require('../../db')

async function getLogin(req, res, next){
  try{
    const requestTokens = await authEtsyModel.getOAuthRequestToken(req.claim.shops_id)

    const [ updatedStore ] = await db('stores')
                                  .update({tokenSecret: requestTokens.tokenSecret})
                                  .where({shops_id:req.claim.shops_id})
                                  .andWhere({ name: 'Etsy'})
                                  .returning('*')

    if(req.claim.role_id !== 1){
      return next({status:403, message: "Not admin"})
    }
    else if(updatedStore.accessToken && updatedStore.accessTokenSecret) {
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
    const shops_id = req.claim.shops_id
    const { oauth_token, oauth_verifier } = req.body

    const { accessToken, accessTokenSecret } = await authEtsyModel
                                                     .getOAuthAccessToken(shops_id, oauth_token, oauth_verifier)

    const shop = await authEtsyModel.setAccessToken(shops_id, accessToken, accessTokenSecret)
    return res.sendStatus(200)
  }
  catch(err){
    next(err)
  }
}

async function withEtsyTokens(req, res, next){
  try{
    const { shops_id } = req.claim
    const { accessToken, accessTokenSecret } = await db('stores')
                       .where({ shops_id })
                       .andWhere({name:'Etsy'})
                       .first()

    if(!accessToken && !accessTokenSecret){
      return next({ status: 403, message: 'Etsy Access Tokens Not Available' })
    }

    req.etsyTokens = { accessToken, accessTokenSecret }

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
