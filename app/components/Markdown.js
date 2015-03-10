import React from 'react'
import _ from 'lodash'

var md = new Remarkable({
	linkify: true,
	html: true,
	typographer:  true
})

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g
MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}})

export default class Markdown extends React.Component {

	componentDidMount(root) {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,root])
	}

	componentDidUpdate(a,root) {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,root])
	}

	render(root) {
		var str = this.props.children

		try {
			str = _.template(str)(this.props)
		} catch(e) { }

		return (
			<div className={this.props.className} dangerouslySetInnerHTML={{ __html: md.render(str) }}></div>
		)
	}

}
