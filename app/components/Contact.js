import React from 'react'
import Markdown from './Markdown'
import contact from '../content/contact.dk.md'

export default class Contact extends React.Component {

	render() {
		return <Markdown>{contact}</Markdown>
	}

}
