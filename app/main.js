import App from './components/App'
import React from 'react'
//import Faye from 'faye'

window.token = false

React.render(<App/>, document.body)
/*
var client = new Faye.Client('http://localhost:3000/socket')

client.on('/messages', message => {})

setTimeout(()=>{
	client.emit('/messages', { text: 'hello there' })
}, 1000)

*/