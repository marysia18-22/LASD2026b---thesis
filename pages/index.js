import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Navigation from '../components/Navigation'
import About from '../sections/About'
import Chairs from '../sections/Chairs'
import Committee from '../sections/Committee'
import Header from '../sections/Header'
import ImportantDates from '../sections/ImportantDates'
import Motivation from '../sections/Motivation'
import PastConferences from '../sections/PastConferences'
import Program from '../sections/Program'
import Submissions from '../sections/Submissions'
import Topics from '../sections/Topics'

import { readCsv, readJson } from '../utils'

export default function Home({ edition, chairs, committee }) {
  return (
    <Container fluid className='px-0' style={{backgroundColor: edition.branding.backgroundColor}}>
      <Head>
        <title>{edition.series} {edition.year}</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous"></link>
      </Head>

      <Navigation edition={edition}/>

      <Header edition={edition}/>
      <About />
      <Motivation />
      <Topics />
      <Submissions edition={edition}/>
      <ImportantDates dates={edition.importantDates}/>
      <Program program={edition.program}/>
      <Chairs people={chairs} />
      <Committee people={committee} />
      <PastConferences edition={edition}/>
    </Container>
  )
}

export async function getStaticProps() {
  return {
    props: {
      chairs: readCsv('./data/chairs.csv'),
      committee: readCsv('./data/committee.csv'),
      edition: readJson('./data/edition.json')
    }
  }
}
