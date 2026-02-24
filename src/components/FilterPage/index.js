import './index.css'

const FilterPage = props => {
  const {employee, salary, changeEmploymentType, changeSalaryRange} = props

  const changeEmployee = event => {
    changeEmploymentType(event.target.value)
  }

  const changeSalary = event => {
    changeSalaryRange(event.target.value)
  }

  const renderEmployeeDetails = () =>
    employee.map(each => (
      <li key={each.employmentTypeId}>
        <input
          type="checkbox"
          id={each.employmentTypeId}
          onChange={changeEmployee}
          value={each.employmentTypeId}
        />
        <label className="labelEmployee" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))

  const renderSalaryRanges = () =>
    salary.map(each => (
      <li key={each.salaryRangeId}>
        <input
          type="radio"
          id={each.salaryRangeId}
          name="salary"
          value={each.salaryRangeId}
          onChange={changeSalary}
        />
        <label className="labelSalary" htmlFor={each.salaryRangeId}>
          {each.label}
        </label>
      </li>
    ))

  return (
    <div>
      <h1>Type of Employment</h1>
      <ul>{renderEmployeeDetails()}</ul>
      <hr />
      <h1>Salary Range</h1>
      <ul>{renderSalaryRanges()}</ul>
    </div>
  )
}
export default FilterPage
