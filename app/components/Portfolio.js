import React from 'react'
import Markdown from './Markdown'
import piece from '../content/portfoliopiece.dk.md'

export default class Portfolio extends React.Component {

	render() {

		return (
			<div>
				<Markdown className='md'>{piece}</Markdown>
				<div style={{height: 100}}></div>
			</div>
		)

	}

}
