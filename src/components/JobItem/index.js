import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import SimilarJobs from '../SimilarJobs'
import Skills from '../Skills'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItem extends Component {
  state = {
    jobDataItem: null,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
        },
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        similarJobs: data.similar_jobs.map(each => ({
          id: each.id,
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }

      this.setState({
        jobDataItem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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

  renderSuccessView = () => {
    const {jobDataItem} = this.state
    const {
      jobDetails,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      similarJobs,
    } = jobDataItem

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="ItemMainCont">
        <div className="mainTopCont">
          <div className="itemMainTopCont">
            <img
              className="itemMainImage"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="itemTopRighCont">
              <FaStar />
              <p className="itemRatingPara">{rating}</p>
            </div>
          </div>

          <div className="itemMiddleCont">
            <div className="itemMiddleLeftCont">
              <FaMapMarkerAlt />
              <p className="itemLocationPara">{location}</p>
              <BsBriefcaseFill />
              <p className="itemEmployeePara">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>

          <hr />

          <div className="itemMiddleInnerCont">
            <h1>Description</h1>
            <a
              href={companyWebsiteUrl}
              alt="website logo"
              target="_blank"
              rel="noreferrer"
            >
              Visit
            </a>
          </div>

          <p>{jobDescription}</p>

          <h1>Skills</h1>
          <ul className="skillsUlCont">
            {skills.map(each => (
              <Skills key={each.name} item={each} />
            ))}
          </ul>

          <h1>Life at Company</h1>
          <div className="itemMiddleLifeCont">
            <p className="itemMiddleTextPara">{description}</p>
            <img
              className="itemMiddleImageCont"
              alt="life at company"
              src={imageUrl}
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="itemBottomUlCont">
          {similarJobs.map(each => (
            <SimilarJobs key={each.title} item={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobItem
