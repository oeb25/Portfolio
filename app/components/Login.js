import React from 'react'
import $ from 'superagent'

export default class Login extends React.Component {

	constructor() { }

	handleLogin(e) {
		e.preventDefault()

		var credentials = {
			username: e.target.username.value,
			password: e.target.password.value
		}

		$.post('/login', credentials, function(){})
	}

	handleSignup(e) {
		e.preventDefault()

		var credentials = {
			username: e.target.username.value,
			password: e.target.password.value
		}

		console.log(credentials)

		$.post('/signup', credentials, function(){})
	}

	render() {
		return (
			<div>
				<form class="form-horizontal">
					<fieldset>
						<legend>Login</legend>
						<div class="form-group">
							<label for="inputEmail" class="col-lg-2 control-label">Email</label>
							<div class="col-lg-10">
								<input type="email" class="form-control" id="inputEmail" placeholder="Email"/>
							</div>
						</div>
						<div class="form-group">
							<label for="inputPassword" class="col-lg-2 control-label">Password</label>
							<div class="col-lg-10">
								<input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
							</div>
						</div>
					</fieldset>
				</form>
				<form onSubmit={this.handleLogin.bind(this)}>
					<div className="form-control-wrapper">
						<input className="form-control empty" name="username" type="email"/>
						<div class="floating-label">email</div>
						<input name="password" type="password"/>

						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		)
	}

}