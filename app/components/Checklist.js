import React from 'react'
import assign from 'object-assign'

export default class Checklist extends React.Component {

	constructor() {
		this.state = {
			selected: {}
		}
	}

	componentDidMount(props, state) {
		var selected = []

		this.props.options.forEach((opt) => {
			selected[opt] = !!this.props.default
		})

		console.log('update', this.props, this.state, {} == {})

		this.setState(assign(selected, this.state.selected))
	}

	render() {
		var opts = []

		for (var opt in this.state.selected) {
			opts.push(opt)
		}

		console.log(opts, this.state.selected)

		return (
			<div>
				{opts.map((opt) =>
					<p>{opt}</p>
				)}
			</div>
		)
	}

}
