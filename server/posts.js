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
	_id: undefined
}

const routes = new Router

routes
	.get('/', function*() {
		this.body = [{ _id: 'swag', title: 'more swag', content: 'most swag' }]//yield Posts.find()
	})
	.get('/tags', function*() {
		this.body = tags
	})
	.get('/:id', function*() {
		this.body = { _id: this.params.id, title: 'more ' + this.params.id, content: 'most ' + this.params.id }
	})
	.post('/', function*() {
		var post = yield parse(this)

		this.body = post
	})

export default {
	routes
}