import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import FilterPage from '../FilterPage'
import JobItemDetails from '../JobItemDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    status: apiStatus.inProgress,
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {salaryRange, searchInput, employmentTypes} = this.state
    const employmentTypeQuery = employmentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsData: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  getRenderFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  getRenderInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobDetails)
  }

  changeEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentTypes: prevState.employmentTypes.includes(id)
          ? prevState.employmentTypes.filter(each => each !== id)
          : [...prevState.employmentTypes, id],
      }),
      this.getJobDetails,
    )
  }

  searchData = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobDetails()
  }

  getRenderSuccess = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div className="noDataCont">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }
    return (
      <ul className="jobsUl">
        {jobsData.map(each => (
          <JobItemDetails key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  getSwitchstatement = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.getRenderSuccess()
      case apiStatus.failure:
        return this.getRenderFailure()
      case apiStatus.inProgress:
        return this.getRenderInProgress()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobsCont">
        <Header />
        <div className="jobsBottomCont">
          <div className="jobsBottomLeftCont">
            <Profile />
            <hr />
            <FilterPage
              employee={employmentTypesList}
              salary={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobsBottomRightCont">
            <div className="jobBottomInputCont">
              <input
                placeholder="search"
                type="search"
                className="jobInputCont"
                onChange={this.searchData}
                value={searchInput}
              />
              <button
                type="button"
                onClick={this.onSearch}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getSwitchstatement()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
