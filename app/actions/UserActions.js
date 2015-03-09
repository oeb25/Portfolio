import ChatDispatcher from '../dispatcher/ChatDispatcher'
import { UserConstants } from '../Constants'
import $ from 'superagent'

export default {

	getAll() {
		$.get('/users', data => {
			if (!data.error)
				ChatDispatcher.dispatch({
					type: UserConstants.FETCH,
					users: data.body
				})
		})
	},

}