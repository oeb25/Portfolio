import koa from 'koa'
import router from 'koa-router'
import logger from 'koa-logger'
import serve from 'koa-static'
import parse from 'co-body'
import jwt from 'jsonwebtoken'
import auth from './auth'
import threads from './threads'
import posts from './posts'
import mount from 'koa-mount'
import secrets from './secrets'
import faye from 'faye'

const app = koa(),
	bayeux = new faye.NodeAdapter({ mount: '/socket' })

app.use(serve('public'))
app.use(logger())

app.use(function*(next) {
	var token = this.cookies.get('auth')

	var userid = token ? yield auth.verify(token, secrets.jwt) : false

	if (userid)
		this.user = yield auth.getUser(userid)

	yield next
})

app.use(router(app))

app.use(mount('/auth', auth.routes.middleware()))
app.use(mount('/posts', posts.routes.middleware()))
app.use(mount('/threads', threads.routes.middleware()))
app.get('/users', auth.getAllUsers)

const server = require('http').Server(app.callback())
bayeux.attach(server)

bayeux.getClient().on('messages', data=> {
	console.log(data)
})

server.listen(3000)
console.log('Listening on port 3000')