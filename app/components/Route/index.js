import React from 'react'
import When from './When'
import Default from './Default'
import Link from './Link'
import Store from './Store'
import assign from 'object-assign'

function getCurrentRoute() {
	return { route: Store.getCurrentRoute() }
}

export class Route extends React.Component {

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

	_onChange() {
		this.setState(getCurrentRoute())
	}

	render() {
		var useDefault = true
		var content = ''

		this.props.children.forEach(a => {
			switch(a.type) {
				case When:
					var url = a.props.url
					var match = this.state.route

					var paramPos = a.props.url.indexOf('/:')

					if (paramPos !== -1) {
						url = url.substr(0,paramPos)
						var tmp = match.substr(1)

						if (tmp.indexOf('/') !== paramPos - 1)
							return

						match = match.substr(0,paramPos)

						var paramName = a.props.url.substr(paramPos + 2)
						var param = this.state.route.substr(paramPos + 1)
					}

					if (url !== match)
						return

					content = a.props.children

					if (paramPos !== -1) {
						var props = {}

						props[paramName] = param

						content = React.createElement(content.type, assign({}, content.props, props), content.children)
					}

					useDefault = false
					break
				case Default:
					if (!useDefault)
						return

						content = a.props.children

					break
			}
		})

		return content
	}

}