const Koa = require('koa')
const mount = require('koa-mount')
const body = require('koa-body')
const routes = require('./routes')
const app = new Koa()
const CONFIG = require('../config');

app.use(body({multipart: true}))
app.use(mount('/users', routes.userRoute))

if(!module.parent) {
    app.listen(CONFIG.PORT, () => {
        console.log(`Server listening on port ${CONFIG.PORT}.`);
    });
}

module.exports = {
    app
}