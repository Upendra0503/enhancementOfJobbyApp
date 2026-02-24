import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessDetails = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureDetails = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username && password) {
      const userDetails = {
        username,
        password,
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()
      if (response.ok === true) {
        console.log('hii')
        this.onSuccessDetails(data.jwt_token)
      } else {
        this.onFailureDetails(data.error_msg)
      }
    } else {
      this.setState({
        showErrorMsg: true,
        errorMsg: 'Username or password is invalid',
      })
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginMainBg">
        <form onSubmit={this.submitLoginDetails}>
          <div className="loginInnerBg">
            <img
              className="loginImg"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
            <label className="labelText" htmlFor="usernameId">
              USERNAME
            </label>
            <input
              onChange={this.changeUsername}
              type="text"
              placeholder="Username"
              id="usernameId"
              className="usernameInput"
              value={username}
            />
            <label className="labelText" htmlFor="passwordId">
              PASSWORD
            </label>
            <input
              onChange={this.changePassword}
              type="password"
              placeholder="Password"
              id="passwordId"
              className="usernameInput"
              value={password}
            />
            <button type="submit" className="buttonLogin">
              Login
            </button>
            {showErrorMsg && <p>*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default Login
