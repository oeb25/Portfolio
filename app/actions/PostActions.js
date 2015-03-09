import ChatDispatcher from '../dispatcher/ChatDispatcher'
import { PostConstants } from '../Constants'
import $ from 'superagent'

export default {

	getAll() {
		$.get('/posts', data => {
			if (!data.error)
				ChatDispatcher.dispatch({
					type: PostConstants.FETCH,
					posts: data.body
				})
		})
	},

	getPost(id) {
		$.get(`/posts/${id}`, data => {
			if (!data.error) {
				ChatDispatcher.dispatch({
					type: PostConstants.FETCH_SINGLE,
					post: data.body
				})
			}
		})
	},

	createPost(post, password) {
		$.post('/posts', { post, password }, data => {
			console.log(data.body, 'works')
		})
	},

	getAllTags() {
		$.get('/posts/tags', data => {

			if (!data.error)
				ChatDispatcher.dispatch({
					type: PostConstants.TAGS,
					tags: data.body
				})
		})
	}

}