import Router from 'koa-router'
import monk from 'monk'
import wrap from 'co-monk'
import assign from 'object-assign'
import auth from './auth'
import parse from 'co-body'

const db = monk('localhost/superTest')
const Posts = wrap(db.get('threads'))

const tags = [
	'javascript',
	'komm/it',
	'design',
	'1.g',
	'2.g',
	'3.g'
]

const PostModel = {
	title: 'undefined title',
	comments: [],
	tags: [],
	_id: undefined,
	text: 'undefined text'
}

const routes = new Router

routes
	.get('/', function*() {
		this.body = yield Posts.find({})
	})
	.get('/tags', function*() {
		this.body = tags
	})
	.get('/:id', function*() {
		//this.body = { _id: this.params.id, title: 'more ' + this.params.id, content: 'most ' + this.params.id }

		var post = yield Posts.findOne({ _id: this.params.id })

		console.log(post)

		this.body = assign(PostModel, post)
	})
	.post('/', function*() {
		var { post: input, password } = yield parse(this)

		var post = yield Posts.insert(assign(PostModel, input))

		this.body = post
	})

export default {
	routes
}