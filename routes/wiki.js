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

wikiRouter.get('/:urlTitle', (req, res, next) => {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	}).then(page => {
		res.render('wikipage', {page: page.dataValues})
	}).catch(next)
})

wikiRouter.post('/', (req, res, next) => {
	const newPage = Page.build({
		title: req.body.title,
		content: req.body['page-content'],
		status: req.body['page-status']
	})
	newPage.save().then(() => {
		res.redirect(newPage.route)
	}).catch(next)
})

module.exports = wikiRouter
