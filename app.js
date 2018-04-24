const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const router = require('./routes');
const models = require('./models');


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

models.User.sync()
	.then(() => {
		console.log('User table created!');
		return models.Page.sync();
	})
	.then(() => {
		console.log('Page table created!');
		app.listen(3000, () => console.log('server is running'));
	})
	.catch(console.error.bind(console));

app.get('/', router);
app.use(function (req, res) {
	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted:\n')
	res.end(JSON.stringify(req.body, null, 2))
});
