const express = require('express');
const wikiRouter = express.Router();

wikiRouter.get('/', (req, res) => {
	res.render('index')
})

wikiRouter.get('/add', (req, res) => {
	res.render('addpage')
})

module.exports = wikiRouter;
