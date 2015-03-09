import ChatDispatcher from '../dispatcher/ChatDispatcher'
import { ThreadConstants } from '../Constants'
import $ from 'superagent'

export default {

	fetchAll() {
		$.get('/threads', data => {
			if (!data.error)
				ChatDispatcher.dispatch({
					type: ThreadConstants.FETCH,
					threads: data.body
				})
		})
	},

	openWith(_id) {
		$.post('/threads/open', { _id }, data => {
			var id = data.body._id

			console.log(data, id)
		})
	}

}