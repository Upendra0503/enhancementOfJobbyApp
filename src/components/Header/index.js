import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="mainNav">
      <Link to="/">
        <img
          className="navImage"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <div className="navRightCont">
        <Link to="/">
          <h1 className="navRightHome">Home</h1>
        </Link>
        <Link to="/jobs">
          <h1 className="navRightJob">Jobs</h1>
        </Link>
      </div>
      <button className="navButton" type="button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
