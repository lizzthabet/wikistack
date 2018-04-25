const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
})

const Page = db.define(
	'page',
	{
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		urlTitle: {
			type: Sequelize.STRING,
			allowNull: false
		},
		content: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		status: Sequelize.ENUM('open', 'closed'),
		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		getterMethods: {
			route() {
				return `/wiki/${this.urlTitle}`
			}
		}
	}
)

Page.beforeValidate(page => {
	page.urlTitle = generateUrlTitle(page.title)
})

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	}
})

module.exports = {
	db,
	Page,
	User
}

function generateUrlTitle(title) {
	if (title) return title.replace(/\s+/g, '_').replace(/\W/g, '')
	else return Math.random().toString(36).substring(2, 7)
}
