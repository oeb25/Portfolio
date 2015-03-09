import React from 'react'
import PostStore from '../stores/PostStore'
import PostActions from '../actions/PostActions'
import Link from './Route/Link'
import Markdown from './Markdown'
import assign from 'object-assign'

function getPost(id) {
	return { post: PostStore.get(id) || {} }
}

export default class Post extends React.Component {

	constructor() {
		this.state = getPost()

		this._onChange = this._onChange.bind(this)
	}

	componentDidMount() {
		PostStore.addChangeListener(this._onChange)
		PostActions.getPost(this.props.id)
	}

	componentWillUnmount() {
		PostStore.removeChangeListener(this._onChange)
	}

	_onChange() {
		this.setState(getPost(this.props.id))
	}

	render() {
		return (
			<div>
				<h1>{this.state.post.title}</h1>
				<div className='well'>
					<Markdown>{this.state.post.text}</Markdown>
				</div>
			</div>
		)
	}

}
