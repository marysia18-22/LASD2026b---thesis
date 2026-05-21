import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Submissions = ({edition}) => {
  const { links } = edition

  return (
  <Container className="bg-white section p-4 my-5 rounded">
    <a className='target' id='submissions'/>
    <h2 className='display-4 anchor mb-3'>Submissions</h2>
    <p>
      We invite research papers in three categories: Full Papers (12 pages), Short Papers (8 pages), and Posters (4 pages). Authors have the option to add a single extra page at a supplementary cost (regardless of the submission category). Papers must be in English and present original, not already published research. Papers should be submitted in the PDF format using the ISD <a href={links.paperTemplate}>template</a>.
    </p>
      <Row className="justify-content-center my-3">
        <Button className="btn-lg" href={links.submissionPortal}>Submit a paper</Button>
      </Row>
    <p>
      Each submission will be reviewed by at least three program committee members. To facilitate the double-blind reviewing, authors are kindly requested to provide the paper WITHOUT any reference to any of the authors, including the authors' personal details, the acknowledgments section of the paper and any other reference that may disclose the authors' identity.
    </p>


  </Container>
  )
}

export default Submissions

//    <p>An extended version of the best papers will be forwarded for further procedure in <em>Computer Science and Information Systems</em> (<a href="http://www.comsis.org">ComSIS</a>, IF: 1.4) and <em>Journal of Computer Languages</em> (<a href="https://www.journals.elsevier.com/journal-of-computer-languages">Cola</a>, IF: 2.2).</p>
