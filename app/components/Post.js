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
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		PostStore.addChangeListener(this._onChange)
		PostActions.getPost(this.props.id)
	}

	componentWillUnmount() {
		PostStore.removeChangeListener(this._onChange)
	}

	handleChange(e) {
		this.setState({ swag: e.target.value })
	}

	_onChange() {
		this.setState(getPost(this.props.id))
	}

	render() {
		return (
			<div>
				<div className='well'>
					<Markdown text={this.state.post.content}/>
				</div>
				<div className='well'>
					<textarea value={this.state.swag} onChange={this.handleChange}></textarea>
					<Markdown text={this.state.swag}/>
				</div>
			</div>
		)
	}

}
