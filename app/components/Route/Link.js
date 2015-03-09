import React from 'react'
import Actions from './Actions'
import Store from './Store'

function getCurrentRoute() {
	return { route: Store.getCurrentRoute() }
}

export default class Link extends React.Component {

	constructor() {
		this.state = getCurrentRoute()

		this._onChange = this._onChange.bind(this)
	}

	componentDidMount() {
		Store.addChangeListener(this._onChange)
	}

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange)
	}

	handleClick(e) {
		e.preventDefault()

		Actions.goTo(this.props.to)
	}

	_onChange() {
		this.setState(getCurrentRoute())
	}

	render() {
		var classes = this.props.className || ''

		if (this.state.route == this.props.to)
			classes += ' active'

		if (this.props.list)
			return (
				<li className={classes}>
					<a onClick={this.handleClick.bind(this)} href={`/#${this.props.to}`}>
						{this.props.children}
					</a>
				</li>
			)

		return (
			<a className={classes} onClick={this.handleClick.bind(this)} href={`/#${this.props.to}`}>
				{this.props.children}
			</a>
		)
	}

}

Link.goTo = function(to) {
	Actions.goTo(to)
}