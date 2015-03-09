import Constants from './Constants'

var __e = require('events')
var Events = new __e.EventEmitter

var ignore = false

var RouteActions = {

	goTo(to) {
		if (to.indexOf('/') !== 0)
			to = `/${to}`

		ignore = true

		window.location = `#${to}`
		Events.emit(Constants.CHANGE, { to })
	},

	on(event, cb) {
		Events.on(event, cb)
	}

}

window.onpopstate = (e) => {
	if (!ignore)
		RouteActions.goTo(window.location.hash.substr(2))

	ignore = false
}

window.onpopstate()

export default RouteActions