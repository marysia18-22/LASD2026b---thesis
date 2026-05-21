import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styles from '../styles/ImportantDates.module.css'

const ImportantDates = ( {dates} ) => (
  <Container className="bg-white section p-4 my-5 rounded">
    <a className='target' id='dates'/>
    <h2 className='display-4 mb-3'>Important Dates</h2>
    <Row>
      <Col className="md-6">
        <ul className={styles.timeline}>
            {dates.map((item) => (
            <ScheduleDateItem
              key={item.date + item.label}
              date={item.date}
              label={item.label}
              tentative={item.tentative}
            />
          ))}
        </ul>
      </Col>
    </Row>
  </Container>
)

function ScheduleDateItem({ date, label, tentative }) {
  const scheduleDate = new Date(date)
  const today = new Date() //actual date
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const displayLabel = tentative ? `${label} (tentative)` : label
  const labelContent =
    today.getTime() > scheduleDate.getTime() ? <del>{displayLabel}</del> : displayLabel
  const formattedDate = monthNames[scheduleDate.getMonth()] + ' ' + scheduleDate.getDate() + ', ' + scheduleDate.getFullYear()
  return (
    <li>
      <h5>{labelContent}</h5>
      <h5 className="float-right">{formattedDate}</h5>
    </li>
  )
}

export default ImportantDates
