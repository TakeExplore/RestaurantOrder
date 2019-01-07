const menu = require('./menu.js')
const registered = require('./registered.js')
const login = require('./login.js')
const order = require('./order.js')
const price = require('./price.js')
const pay = require('./pay.js')
const form = require('./form.js')
const history = require('./history.js')

module.exports = (app) => {
	app.use(menu)
	app.use(registered)
	app.use(login)
	app.use(order)
	app.use(price)
	app.use(pay)
	app.use(form)
	app.use(history)
}