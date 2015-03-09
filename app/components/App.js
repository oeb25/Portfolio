import React from 'react'
import Post from './Post'
import PostList from './PostList'
import Header from './Header'
import { Route } from './Route'
import When from './Route/When'
import Default from './Route/Default'
import Login from './Login'
import Contact from './Contact'
import Portfolio from './Portfolio'
import Markdown from './Markdown'
import welcome from '../content/welcome.dk.md'

export default class App extends React.Component {

	render() {
		return (
			<div>
				<Header/>
				<div className='container'>
					<Route>
						<When url='/'><Markdown>{welcome}</Markdown></When>
						<When url='/works'><Portfolio/></When>
						<When url='/contact'><Contact/></When>
						<When url='/login'><Login/></When>
						<When url='/post/:id'><Post/></When>
						<When url='/posts'><PostList/></When>
						<Default><h1>404</h1></Default>
					</Route>
				</div>
			</div>
		)
	}

}