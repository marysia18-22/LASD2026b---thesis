import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export const conferences = [
  {
    title: "LASD@SAC'26",
    location: "Thessaloniki 2026",
    image: "thessaloniki2026",
    website: "https://y2026.lasd.pl",
    proceedings: "",
    city: "Thessaloniki",
    country: "Greece",
    year: "2026",
    start_date: "2026-03-23",
    end_date: "2026-03-27"
  },
  {
    title: "LASD@ISD'25",
    location: "Belgrade 2025",
    image: "belgrade2025",
    website: "https://y2025.lasd.pl",
    proceedings: "https://aisel.aisnet.org/isd2014/proceedings2025/agile/"
  },
  {
    title: "LASD@ISD'24",
    location: "Sopot 2024",
    image: "sopot2024",
    website: "https://y2024b.lasd.pl",
    proceedings: "https://aisel.aisnet.org/isd2014/proceedings2024/agile/"
  },
  {
    title: "LASD@SAC'24",
    location: "Avila 2024",
    image: "avila2024",
    website: "https://y2024.lasd.pl",
    proceedings: "https://dl.acm.org/doi/proceedings/10.1145/3605098#heading18"
  },
  {
    title: "LASD@SAC'23",
    location: "Tallinn 2023",
    image: "tallinn2023",
    website: "https://y2023.lasd.pl",
    proceedings: "https://dl.acm.org/doi/proceedings/10.1145/3555776#heading21"
  },
  {
    title: "LASD'22",
    location: "Virtual Event 2022",
    image: "virtual",
    website: "https://y2022.lasd.pl",
    proceedings: "https://link.springer.com/book/10.1007/978-3-030-94238-0"
  },
  {
    title: "LASD'21",
    location: "Virtual Event 2021",
    image: "virtual",
    website: "https://y2021.lasd.pl",
    proceedings: "https://link.springer.com/book/10.1007/978-3-030-67084-9"
  },
  {
    title: "LASD@FedCSIS'20",
    location: "Virtual Event 2020",
    image: "virtual",
    website: "https://www.fedcsis.org/2020/lasd",
    proceedings: "https://annals-csis.org/Volume_21/#H4LASD"
  },
  {
    title: "LASD@FedCSIS'19",
    location: "Leipzig 2019",
    image: "leipzig2019",
    website: "https://www.fedcsis.org/2019/lasd",
    proceedings: "https://annals-csis.org/Volume_18/#H4LASD"
  },
  {
    title: "LASD@FedCSIS'18",
    location: "Poznan 2018",
    image: "poznan2018",
    website: "https://www.fedcsis.org/2018/lasd",
    proceedings: "https://annals-csis.org/Volume_15/#H4LASD"
  },
  {
    title: "LASD@FedCSIS'17",
    location: "Prague 2017",
    image: "prague2017",
    website: "https://www.fedcsis.org/2017/lasd",
    proceedings: "https://annals-csis.org/Volume_11/#H4LASD"
  }
]


const PastConferences = ({edition}) => (
  <Container fluid="md" className='history pb-5 px-4 mt-5'>

    <a className='target' id='conferences'/>
    <h2 className="display-4 anchor mb-3">History</h2>    
    <Row className="justify-content-md-center m-1">
      {conferences.map(c => (
      <Col key={c.title} md='auto' className="m-2">
        <Card style={{ width: '14rem' , overflow: 'hidden', border: '1px solid #dee2e6', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} className="mx-auto">
          {c.image && <Card.Img variant="top" src={edition.pastConferences[c.image]} style={{ height: '110px', objectFit: 'cover', objectPosition: 'center', padding: '6px', paddingBottom: '0px', borderRadius: '4px' }} />}
          <Card.Body>
            <Card.Title>{c.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{c.location}</Card.Subtitle>
            <Card.Link href={c.website} className="badge badge-light text-primary">Website</Card.Link>
            <Card.Link href={c.proceedings} className="ml-2 badge badge-light text-primary">Proceedings</Card.Link>
          </Card.Body>
        </Card>
      </Col>
      ))}
    </Row>
  </Container>
)

export default PastConferences
