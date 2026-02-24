import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = item

  return (
    <li className="bottomLiCont">
      <div className="bottomLiTopCont">
        <img className="bottomLiImage" alt={title} src={companyLogoUrl} />
        <div className="bottomRightCont">
          <h1>{title}</h1>
          <div className="bottomRightBottomCont">
            <FaStar />
            <p className="bottomRatingPara">{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="bottomLiLastCont">
        <FaMapMarkerAlt />
        <p className="bottomLocationPara">{location}</p>
        <BsBriefcaseFill />
        <p className="bottomLiEmployeePara">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
