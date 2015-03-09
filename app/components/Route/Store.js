import events from 'events'
import Constants from './Constants'
import Actions from './Actions'

var EventEmitter = events.EventEmitter
const CHANGE_EVENT = 'change'

var _currentRoute = '/'

class RouteStore extends EventEmitter {

	getCurrentRoute() {
		return _currentRoute
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

var _RouteStore = new RouteStore


Actions.on(Constants.CHANGE, action => {
	if (_currentRoute === action.to)
		return

	_currentRoute = action.to
	_RouteStore.emitChange()
})

export default _RouteStore