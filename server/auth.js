import monk from 'monk'
import wrap from 'co-monk'
import jwt from 'jsonwebtoken'
import assign from 'object-assign'
import Router from 'koa-router'
import secrets from './secrets'

const db = monk('localhost/superTest')

const Users = wrap(db.get('users'))

const UserModel = {
	username: undefined,
	password: undefined,
	_id: undefined
}

const Auth = {

	require: function*(next) {
		if (this.user)
			yield next
		else
			this.status = 403
	},

	verify(token) {
		return new Promise(function(resolve, reject) {
			jwt.verify(token, secrets.jwt, function(err, data) {
				if (err)
					return reject(err)

				resolve(data)
			})
		})
	},

	login: function*({ username, password }) {
		var user = yield Users.findOne({ username })

		return user
	},

	signup: function*({ username, password }) {
		var user = yield Users.findOne({ username })

		if (user)
			return false

		user = assign({}, UserModel, { username, password })

		var _user = yield Users.insert(user)

		return _user
	},

	getUser: function*(_id) {
		var user = yield Users.findOne({ _id })

		return user
	},

	getAllUsers: function*() {
		var users = yield Users.find({})

		users = users.map(user => {
			var { username, _id } = user

			return { username, _id }
		})

		this.body = users
	}

}

Auth.routes = new Router()
	.get('/logout', function*() {
		this.cookies.set('auth', '')
		this.redirect('/')
		this.status = 200
	})

	.post('/login', function*() {
		console.log('login')

		var creds = yield parse(this)
		var user = yield auth.login(creds)
		var token = jwt.sign(user._id, secrets.jwt)

		this.cookies.set('auth', token)
		this.status = 200
	})

	.post('/signup', function*() {
		console.log('signup')

		var creds = yield parse(this)
		var user = yield auth.signup(creds)
		var token = jwt.sign(user._id, secrets.jwt)

		this.cookies.set('auth', token)
		this.status = 200
	})

	.get('/creds', Auth.require, function*() {
		if (this.user)
			this.body = { user: this.user }
		else
			this.body = { msg: 'no you dont!' }
	})

export default Auth