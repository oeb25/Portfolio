import React from 'react'
import Navbar from './Navbar'
import Link from './Route/Link'

export default class Header extends React.Component {

	constructor() {
		this.state = {

		}
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div>
				<Navbar>
					<Link list={true} to="/posts">Posts</Link>
					<Link list={true} to="/works">Works</Link>
					<Link list={true} to="/contact">Contact</Link>
					<Link list={true} to="/login">Admin</Link>
				</Navbar>
			</div>
		)
	}

}
