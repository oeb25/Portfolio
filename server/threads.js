import Router from 'koa-router'
import monk from 'monk'
import wrap from 'co-monk'
import assign from 'object-assign'
import auth from './auth'
import parse from 'co-body'

const db = monk('localhost/superTest')
const Threads = wrap(db.get('threads'))

const ThreadModel = {
	participants: [],
	_id: undefined
}

const routes = new Router

routes
	.get('/', auth.require, function*() {
		this.body = yield Threads.find({ participants: { _id: this.user._id } })
	})
	.post('/open', auth.require, function*() {
		var other = yield parse(this)

		other = yield auth.getUser(other._id)

		if (this.user._id === other._id && false)
			return this.body = { msg: 'you cant chat to your self!' }

		var participants = [this.user, other]
			.sort((a, b) => a._id - b._id)
			.map(user => {
				var { _id, username } = user
				return { _id, username }
			})

		var thread = yield Threads.findOne({ participants })

		if (!thread) {
			thread = yield Threads.insert(assign({}, ThreadModel, { participants }))
			console.log('ima create a new with ', participants)
		}

		console.log(thread)

		this.body = thread
	})

export default {
	routes
}