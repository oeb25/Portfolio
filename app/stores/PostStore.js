import events from 'events'
import { PostConstants } from '../Constants'
import ChatDispatcher from '../dispatcher/ChatDispatcher'

var EventEmitter = events.EventEmitter
const CHANGE_EVENT = 'change'

var _allPosts = []
var _posts = {}

class PostStore extends EventEmitter {

	getAll() {
		return _allPosts
	}

	get(id) {
		return _posts[id]
	}

	addChangeListener(cb) {
		this.on(CHANGE_EVENT, cb)
	}

	removeChangeListener(cb) {
		this.removeListener(CHANGE_EVENT, cb)
	}

	emitChange() {
		this.emit(CHANGE_EVENT)
	}

}

var _PostStore = new PostStore

PostStore.prototype.dispatchToken = ChatDispatcher.register(function(action) {
	switch(action.type) {
		case PostConstants.FETCH:
			_allPosts = action.posts
			_PostStore.emitChange()
			break
		case PostConstants.FETCH_SINGLE:
			_posts[action.post._id] = action.post
			_PostStore.emitChange()
			break
	}
})

export default _PostStore