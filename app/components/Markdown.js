import React from 'react'

var md = new Remarkable

export default class Markdown extends React.Component {

	render() {
		return (
			<div dangerouslySetInnerHTML={{ __html: md.render(this.props.text) }}></div>
		)
	}

}
