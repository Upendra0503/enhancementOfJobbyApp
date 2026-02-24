import './index.css'

const Skills = props => {
  const {item} = props
  const {imageUrl, name} = item

  return (
    <li className="skillsLiCont">
      <img className="skillsLiImage" alt={name} src={imageUrl} />
      <p>{name}</p>
    </li>
  )
}
export default Skills
