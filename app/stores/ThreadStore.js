import events from 'events'
import { ThreadConstants } from '../Constants'
import ChatDispatcher from '../dispatcher/ChatDispatcher'

var EventEmitter = events.EventEmitter
const CHANGE_EVENT = 'change'

var _threads = []

class ThreadStore extends EventEmitter {

	getAll() {
		return _threads
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

var _ThreadStore = new ThreadStore

ThreadStore.prototype.dispatchToken = ChatDispatcher.register(function(action) {
	switch(action.type) {
		case ThreadConstants.FETCH:
			_threads = action.threads
			_ThreadStore.emitChange()
			break
	}
})

export default _ThreadStore