import React from 'react'
import Link from './Route/Link'
import Post from './Post'
import PostStore from '../stores/PostStore'
import PostActions from '../actions/PostActions'
import assign from 'object-assign'
import Checklist from './Checklist'

function getAllPosts() {
	return { posts: PostStore.getAll() }
}

export default class PostList extends React.Component {

	constructor() {
		this.state = getAllPosts()

		this._onChange = this._onChange.bind(this)
	}

	componentDidMount() {
		PostStore.addChangeListener(this._onChange)
		PostActions.getAll()
	}

	componentWillUnmount() {
		PostStore.removeChangeListener(this._onChange)
	}

	_onChange() {
		this.setState(getAllPosts())
	}

	render() {
		var posts = this.state.posts.map(post =>
			<Link key={post._id} className='list-group-item' to={`/post/${post._id}`}>{post.title}</Link>
		)

		return (
			<div>
				<h1>Post List here!</h1>
				<div className='list-group'>
					{ posts }
				</div>
			</div>
		)
	}

}
