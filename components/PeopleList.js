import { countryCodes } from "./data/CountryCodes"
import Flag from "./Flag"

const PeopleList = ({ people }) => (
  <ul className="fa-ul ml-1">
    {people.map((person) => {
      const country = person.country
      const detail = [person.country, person.affiliation, person.email].filter(Boolean).join(', ')

      return(
      <li key={`${person.lastName}-${person.firstName}`} className='my-2'>
        <div className="d-flex flex-row">
          {
            countryCodes[country] ? (
              <Flag code={countryCodes[country].toLowerCase()}/> 
            ) : countryCodes[country?.split(', ')[0]] && countryCodes[country?.split(', ')[1]] ? (
              <>
                <Flag code={countryCodes[country.split(', ')[0] ].toLowerCase()}/>
                <Flag code={countryCodes[country.split(', ')[1]].toLowerCase()}/>
              </> 
            ) : ('')
          }
          <p className='mb-0 ml-2'>
            <strong> {person.lastName}, {person.firstName} </strong><br/>
            {detail}
          </p>
        </div>
      </li>
      )
    })}
  </ul>
)

export default PeopleList
