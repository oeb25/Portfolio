import React from 'react'
import Post from './Post'
import PostList from './PostList'
import Header from './Header'
import Route from './Route'
import When from './Route/When'
import Default from './Route/Default'
import Login from './Login'

export default class App extends React.Component {

	render() {
		return (
			<div>
				<Header/>
				<div className='container'>
					<Route>
						<When url='/'><h1>Home</h1></When>
						<When url='/works'><h1>WORKS</h1></When>
						<When url='/contact'><h1>Contant</h1></When>
						<When url='/login'><Login/></When>
						<When url='/post/:id'><Post/></When>
						<Default><PostList/></Default>
					</Route>
				</div>
			</div>
		)
	}

}