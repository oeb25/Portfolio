import React from 'react'
import Link from './Route/Link'

export default class Navbar extends React.Component {

	constructor() {
		this.state = {

		}
	}

	handleClick(to) {
		RouteActions.goTo(to)
	}

	render() {
		var linkStyle = {
			border: 0,
			glow: 0
		}

		return (
			<div className='navbar navbar-default'>
				<div className='navbar-header'>
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<Link className='navbar-brand' to='/'>Oliver Bøving</Link>
				</div>
				<div className='navbar-collapse collapse navbar-responsive-collapse'>
					<ul className='nav navbar-nav'>
						{this.props.children.map(item => {
							return <li>{item}</li>
						})}
					</ul>
				</div>
			</div>
		)
	}

}
