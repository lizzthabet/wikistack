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
		},
		include: [{model: User, as: 'author'}]
	}).then(page => {
		res.render('wikipage', {page: page, author: page.dataValues.author})
	}).catch(next)
})

wikiRouter.post('/', (req, res, next) => {
	User.findOrCreate({
		where: {
			name: req.body['author-name']
		},
		defaults: {
			email: req.body['author-email']
		}
	}).spread((user, created) => {
		const newPage = Page.build({
			title: req.body.title,
			content: req.body['page-content'],
			status: req.body['page-status'],
			tags: req.body['page-tags'].split(',')
		})
		return newPage.save().then(createdPage => createdPage.setAuthor(user))
	}).then(page => {
		res.redirect(page.route)
	}).catch(next)
})

module.exports = wikiRouter
