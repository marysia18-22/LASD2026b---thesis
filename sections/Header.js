import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Header = ({ edition }) => {
  const { branding, host, venue, dates, relatedEditions } = edition
  const related = relatedEditions[0]

  return (
  <Jumbotron className='px-2 pt-5 mb-0' style={{backgroundColor: branding.backgroundColor }}>
    <a className='target' id='home'/>
    <Container className="px-0 py-1">
      <div className="row align-items-center">
        <div className="col-md-6">
	  <Image src={branding.heroImage} alt={branding.heroImageAlt} fluid />
        </div>
        <div className="col-md-6">
          <h1 className='h1 text-center anchor font-weight-bold'>LASD@<a className='u' href={host.url}>{host.name}</a></h1>
          <h2 className='text-center h3 py-3'>Track on <strong>{branding.trackName}</strong></h2>
          <h3 className='text-center h4 pb-3'><small>at the {host.fullName}</small></h3>
          <h4 className='text-center h5'>{dates.display}</h4>
          <h4 className='text-center h5 pb-3'>{venue.display}</h4>
          {related && (
	          <h4 className='text-center h5'>
		        <span className='badge bg-warning p-2 m-3'><a className='u' href={related.url}>{related.shortTitle}</a>, {related.datesDisplay}, {related.location}</span>
	          </h4>
          )}
        </div>
      </div>
    </Container>
  </Jumbotron>
  )
}

export default Header
