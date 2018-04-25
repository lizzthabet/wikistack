const models = require('../models')
const Page = models.Page
const User = models.User
const express = require('express')
const wikiRouter = express.Router()

wikiRouter.get('/', (req, res) => {
  res.redirect('/')
})

wikiRouter.get('/add', (req, res) => {
  res.render('addpage')
})

wikiRouter.post('/', (req, res, next) => {
  //   res.json(req.body)
  //   console.log(req.body)
  const newPage = Page.build(req.body)

  newPage
    .save()
    .then(function() {
      console.log('Page was added to db successfully!')
    })
    .catch(function(err) {
      next(err)
    })
})

module.exports = wikiRouter
