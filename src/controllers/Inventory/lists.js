const listsModel = require('../../models/Inventory/lists')


function getOneList(req, res, next) {
  if (!req.params.listId) {
    return next({status: 400, message: 'No list indicated'})
  }
  listsModel.getOneList(req.params.listId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllLists(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the lists"})
  }
  listsModel.getAllLists(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createList(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper list inputs'})
  }
  listsModel.createList(req.body, parseInt(req.params.shopId))
  .then(data => {
    console.log(data);
    res.status(200).send({data})
  })
  .catch(next)
}

function updateList(req, res, next) {
  if (!req.params.listId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  listsModel.updateList(req.params.listId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function removeList(req, res, next) {
  if (!req.params.listId) {
    return next({status: 400, message: 'Need to know indicated list'})
  }
  listsModel.removeList(parseInt(req.params.listId))
  .then(function(data) {
    console.log(data);
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
getOneList,
getAllLists,
createList,
removeList,
updateList
}
