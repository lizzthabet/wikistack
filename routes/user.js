const express = require('express')
const userRouter = express.Router()
const models = require('../models')
const Page = models.Page
const User = models.User

userRouter.get('/', (req, res) => {
	// get all users, no database changes
	// skipping this for time
})

userRouter.get('/:id', (req, res, next) => {
	let id = req.params.id;
	User.findById(id, {
		include: [Page]
	}).then(userInfo => {
		//if (userInfo === null) res.sendStatus(404)
		res.render('userpage', {user: userInfo})
	}).catch(next)
})

userRouter.post('/', (req, res) => {
	// create a new user in the database
})

userRouter.put('/:id', (req, res) => {
	let id = req.params.id;
	// update a user in the database
})

userRouter.delete('/:id', (req, res) => {
	let id = req.params.id;
	// delete a user from the database
})

module.exports = userRouter;
