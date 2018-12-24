const menu = require('./menu.js')
const registered = require('./registered.js')
const login = require('./login.js')
const order = require('./order.js')

module.exports = (app) => {
	app.use(menu)
	app.use(registered)
	app.use(login)
	app.use(order)
}