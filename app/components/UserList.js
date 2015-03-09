import React from 'react'
import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'
import ThreadActions from '../actions/ThreadActions'

function getUsers() {
	return { users: UserStore.getAll() }
}

export default class UserList extends React.Component {

	constructor() {
		this.state = getUsers()
	}

	getUsers() {
		UserActions.getAll()
	}

	handleClick(id) {
		ThreadActions.openWith(id)
	}

	componentDidMount() {
		UserStore.addChangeListener(this._onChange.bind(this))
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this._onChange.bind(this))
	}

	_onChange() {
		this.setState(getUsers())
	}

	render() {
		console.log(this.state.users)

		var users = this.state.users.map(user =>
			<li onClick={this.handleClick.bind(this, user._id)}>
				<h6>{ user.username }</h6>
			</li>
		)

		return (
			<div>
				<ul>{users}</ul>
				<button onClick={this.getUsers}>Get Users</button>
			</div>
		)
	}

}