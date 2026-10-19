import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { conferences } from './PastConferences'

const formatDateRange = (start, end) => {
  const startDate = new Date(`${start}T00:00:00`)
  const endDate = new Date(`${end}T00:00:00`)

  const month = date =>
    date.toLocaleString('en-US', { month: 'long' })

  const startMonth = month(startDate)
  const endMonth = month(endDate)
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()
  const year = endDate.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`
  }

  return `${startMonth} ${startDay}–${endMonth} ${endDay}, ${year}`
}

const Header = ({ edition }) => {
  const { branding, host, venue, dates } = edition
  const related = conferences[0]

  return (
  <Jumbotron className='px-2 pt-5 mb-0' style={{backgroundColor: branding.backgroundColor }}>
    <a className='target' id='home'/>
    <Container className="px-0 py-1">
      <div className="row align-items-center">
        <div className="col-md-6">
	  <Image src={branding.heroImage} alt={branding.heroImageAlt} fluid />
        </div>
        <div className="col-md-6">
          <h1 className='h1 text-center anchor font-weight-bold'>{edition.series}@<a className='u' href={host.url}>{host.name}'{String(edition.year).slice(-2)}</a></h1>
          <h2 className='text-center h3 py-3'>Track on <strong>{edition.seriesFullName}</strong></h2>
          <h3 className='text-center h4 pb-3'><small>at the {host.fullName}</small></h3>
          <h4 className='text-center h5'>{formatDateRange(dates.start, dates.end)}</h4>
          <h4 className='text-center h5 pb-3'>{venue.city}, {venue.country}</h4>
          {related && (
	          <h4 className='text-center h5'>
		        <span className='badge bg-warning p-2 m-3'><a className='u' href={related.website}>{related.title}</a>,{' '}{formatDateRange(related.start_date, related.end_date)},{' '}{related.city}, {related.country}</span>
	          </h4>
          )}
        </div>
      </div>
    </Container>
  </Jumbotron>
  )
}

export default Header
