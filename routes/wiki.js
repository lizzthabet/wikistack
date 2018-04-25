const express = require('express');
const wikiRouter = express.Router();

wikiRouter.get('/', (req, res) => {
	res.render('index')
})

wikiRouter.get('/add', (req, res) => {
	res.render('addpage')
})

wikiRouter.post('/', (req, res) => {
	res.send('Hi you did it.')
})

module.exports = wikiRouter;
