import React from 'react'
import $ from 'superagent'
import Markdown from './Markdown'
import PostActions from '../actions/PostActions'
import Link from './Route/Link'

export default class Login extends React.Component {

	constructor() {
		this.state = {
			text: ''
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		this.setState({
			text: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault()

		var title = e.target.title.value
		var password = e.target.password.value
		var text = e.target.text.value

		var post = { title, text }

		PostActions.createPost(post, password)

		Link.goTo('/posts')
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<legend>Skriv Blogpost</legend>
					<div className='form-group'>
						<label for='title'>Titel</label>
						<input type='title' className='form-control'
							name='title' placeholder='Titel'/>
					</div>
					<div class='form-group'>
						<label for='password'>Password</label>
						<input type='password' className='form-control'
							name='password' placeholder='Password'/>
					</div>
					<div className='row'>
						<h3>Tekst</h3>
						<div className='col-md-6'>
							<label for='text'>Markdown</label>
							<textarea name='text' onChange={this.handleChange} row='10'
								className='form-control'></textarea>
						</div>
						<div className='col-md-6'>
							<label for='postContent'>Output</label>
							<Markdown>{this.state.text}</Markdown>
						</div>
					</div>
					<br/>
					<button className='btn btn-lg btn-success' type='submit'>
						Lav Blogpost
					</button>
				</form>
			</div>
		)
	}

}