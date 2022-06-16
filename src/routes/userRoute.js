const Koa = require('koa')
const app = new Koa()
const routes = require('koa-route')
const user = require('../controllers/UserController')

app.use(routes.get('/', user.getUser))
app.use(routes.post('/', user.login))

module.exports = app