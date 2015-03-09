import events from 'events'
import { UserConstants } from '../Constants'
import ChatDispatcher from '../dispatcher/ChatDispatcher'

var EventEmitter = events.EventEmitter
const CHANGE_EVENT = 'change'

var _users = []

class UserStore extends EventEmitter {

	getAll() {
		return _users
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

var _UserStore = new UserStore

UserStore.prototype.dispatchToken = ChatDispatcher.register(function(action) {
	switch(action.type) {
		case UserConstants.FETCH:
			_users = action.users
			_UserStore.emitChange()
			break
	}
})

export default _UserStore