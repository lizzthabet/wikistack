const express = require('express');
const router = express.Router();
const models = require('../models');
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.get('/', (req, res, next) => {
	models.Page.findAll().then(pages => {
		res.render('index', {pages: pages})
	}).catch(next)
})

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
