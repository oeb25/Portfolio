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

const secret = 'super-secret-token-whawoaw'

const app = koa()

app.use(serve('public'))
app.use(logger())

app.use(function*(next) {
	var token = this.cookies.get('auth')

	var userid = token ? yield auth.verify(token, secret) : false

	if (userid)
		this.user = yield auth.getUser(userid)

	yield next
})

app.use(router(app))

app.use(mount('/auth', auth.routes.middleware()))
app.use(mount('/posts', posts.routes.middleware()))
app.use(mount('/threads', threads.routes.middleware()))
app.get('/users', auth.getAllUsers)

app.listen(3000)