import './index.css'

const FilterPage = props => {
  const {
    employee,
    salary,
    changeEmploymentType,
    changeSalaryRange,
    changeLocation,
  } = props

  const locationsList = [
    {label: 'Hyderabad', id: 'HYDERABAD'},
    {label: 'Bangalore', id: 'BANGALORE'},
    {label: 'Chennai', id: 'CHENNAI'},
    {label: 'Delhi', id: 'DELHI'},
    {label: 'Mumbai', id: 'MUMBAI'},
  ]

  return (
    <div>
      <h1 className="typeH1">Type of Employment</h1>
      {employee.map(each => (
        <div key={each.employmentTypeId}>
          <input
            type="checkbox"
            value={each.employmentTypeId}
            onChange={e => changeEmploymentType(e.target.value)}
          />
          <label className="labelEmployee">{each.label}</label>
        </div>
      ))}

      <h1>Salary Range</h1>
      {salary.map(each => (
        <div key={each.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            value={each.salaryRangeId}
            onChange={e => changeSalaryRange(e.target.value)}
          />
          <label className="labelSalary">{each.label}</label>
        </div>
      ))}

      <h1>Locations</h1>
      {locationsList.map(each => (
        <div key={each.id}>
          <input
            type="checkbox"
            value={each.id}
            onChange={e => changeLocation(e.target.value)}
          />
          <label className="labelLocation">{each.label}</label>
        </div>
      ))}
    </div>
  )
}

export default FilterPage
