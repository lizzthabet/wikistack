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
  const page = Page.build({
    title: req.body.title,
    content: req.body['page-content'],
    status: req.body['page-status']
    //   date: ???
  })
  page.save().then(res.redirect('/'))
})

module.exports = wikiRouter
