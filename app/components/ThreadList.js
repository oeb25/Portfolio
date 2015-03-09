import React from 'react'
import ThreadStore from '../stores/ThreadStore'
import ThreadActions from '../actions/ThreadActions'

function getThreads() {
	return { threads: ThreadStore.getAll() }
}

export default class ThreadList extends React.Component {

	fetch() {
		ThreadActions.fetchAll()
	}

	constructor() {
		this.state = getThreads()
	}

	componentDidMount() {
		ThreadStore.addChangeListener(this._onChange.bind(this))
	}

	componentWillUnmount() {
		ThreadStore.removeChangeListener(this._onChange.bind(this))
	}

	_onChange() {
		this.setState(getThreads())
	}

	render() {
		var threads = this.state.threads.map(thread =>
			<li>
				<h1>{thread.title}</h1>
				<ul>
					{thread.participants.map(participant =>
						<li>{ participant }</li>
					)}
				</ul>
			</li>
		)

		return (

			<div>
				<ul>
					{threads}
				</ul>
				<button onClick={this.fetch}>Refreash</button>
			</div>

		)
	}

}