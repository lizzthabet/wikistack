const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
	// get all users, no database changes
})

userRouter.get('/:id', (req, res) => {
	let id = req.params.id;
	// get user with id, no database changes
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
