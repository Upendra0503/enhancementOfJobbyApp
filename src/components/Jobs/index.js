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
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
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
    locations: [],
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

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobDetails)
  }

  changeLocation = id => {
    this.setState(prevState => ({
      locations: prevState.locations.includes(id)
        ? prevState.locations.filter(each => each !== id)
        : [...prevState.locations, id],
    }))
  }

  searchData = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobDetails()
  }

  getFilteredJobs = () => {
    const {
      jobsData,
      employmentTypes,
      salaryRange,
      locations,
      searchInput,
    } = this.state

    return jobsData.filter(job => {
      const matchEmployment =
        employmentTypes.length === 0 ||
        employmentTypes.includes(job.employmentType)

      const matchSalary =
        salaryRange === '' || Number(job.packagePerAnnum) >= Number(salaryRange)

      const matchLocation =
        locations.length === 0 ||
        locations.some(
          each => each.toLowerCase() === job.location.toLowerCase(),
        )

      const matchSearch = job.title
        .toLowerCase()
        .includes(searchInput.toLowerCase())

      return matchEmployment && matchSalary && matchLocation && matchSearch
    })
  }

  getRenderSuccess = () => {
    const filteredJobs = this.getFilteredJobs()

    if (filteredJobs.length === 0) {
      return (
        <div className="noDataCont">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1>No Jobs Found</h1>
        </div>
      )
    }

    return (
      <ul className="jobsUl">
        {filteredJobs.map(each => (
          <JobItemDetails key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput, status} = this.state

    return (
      <div className="jobsCont">
        <Header />

        <div className="jobsBottomCont">
          {/* LEFT SIDE FILTER */}
          <div className="jobsBottomLeftCont">
            <Profile />
            <hr />
            <FilterPage
              employee={employmentTypesList}
              salary={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              changeLocation={this.changeLocation}
            />
          </div>

          <div className="jobsBottomRightCont">
            <div className="jobBottomInputCont">
              <input
                placeholder="search"
                type="search"
                value={searchInput}
                onChange={this.searchData}
              />
              <button type="button" onClick={this.onSearch}>
                <BsSearch />
              </button>
            </div>

            {status === apiStatus.inProgress && (
              <Loader type="ThreeDots" color="#fff" height={50} width={50} />
            )}

            {status === apiStatus.success && this.getRenderSuccess()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
