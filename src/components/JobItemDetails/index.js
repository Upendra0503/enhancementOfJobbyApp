import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItemDetails = props => {
  const {each} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="jobLink">
      <li className="jobItemLi">
        <div className="jobItemMainCont">
          <div className="jonItemTopCont">
            <img
              className="jobItemImage"
              alt="company logo"
              src={companyLogoUrl}
            />
            <div className="jobItemTopRightCont">
              <h1 className="jobItemHead">{title}</h1>
              <div className="jobItemTopRightBottomCont">
                <FaStar className="star" />
                <p className="jobItemRatingPara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobItemMiddleCont">
            <div className="jonItemMiddleLeftCont">
              <FaMapMarkerAlt />
              <p className="jobItemLocationPara">{location}</p>
              <BsBriefcaseFill />
              <p className="jobItemEmployeePara">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItemDetails
