import React from 'react'
import Link from './Route/Link'
import Post from './Post'
import PostStore from '../stores/PostStore'
import PostActions from '../actions/PostActions'

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
			<div>
				<div className='list-group-item'>
					<div className='row-action-primary'>
						<i className='mdi-image-blur-on'/>
					</div>
					<div className='row-content'>
						<div className='least-content'>15m</div>
						<h4 key={post._id} className='list-group-item-heading'>
							<Link to={`/post/${post._id}`}>{post.title}</Link>
						</h4>
						<p className='list-group-item-text'>Swag swag swag</p>
					</div>
				</div>
				<div className='list-group-separator'></div>
			</div>
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
