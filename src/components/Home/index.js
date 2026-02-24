import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="homeCont">
    <Header />
    <div className="homeBottomCont">
      <div className="homeInnerCont">
        <h1 className="homeHead">Find The Job That Fits Your Life</h1>
        <p className="homePara">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="homeButton" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default Home
