import Container from 'react-bootstrap/Container'



const Program = ({program}) => (
    <Container className="bg-white section p-4 my-5 rounded">
      <a className='target' id='program'/>
      <h2 className='display-4 anchor mb-3'>Program</h2>
      {program.status === 'tba' ? (
      <p>TBA...</p>
    ) : (
      <p>Program published.</p>
    )}
    </Container>
)


/*
const Program = () => (
    <Container className="bg-white section p-4 my-5 rounded">
    <a className='target' id='program'/>
    <h2 className='display-4 anchor mb-3'>Program</h2>


    <Table bordered className="mt-5">
      <tbody>	

        <tr className='text-center table-primary'><th>Wed., September 3rd</th><th>Session 3B (Room 2); chaired by <em>Anna Sołtysik-Piorunkiewicz and Witold Chmielarz</em></th></tr>
<tr><td className='text-nowrap'>12:00 - 12:30</td><td>Integrating Flow into Portfolio Agility – An Exploratory Study (<em>Joseph Puthenpurackal Chakko, Tim Huygh and Steven De Haes</em>)</td></tr>
<tr><td className='text-nowrap'>12:30 - 13:00</td><td>How did the Emergence of ChatGPT Impact Stack Overflow? – A Literature Review (<em>Daniel Staegemann, Mariia Rizun, Christian Haertel, Matthias Pohl, Christian Daase and Klaus Turowski</em>)</td></tr>
<tr><td className='text-nowrap'>13:00 - 13:30</td><td>Overburdened by Debt: A Quantitative Study of Process Debt's Effect on Workload in Agile Teams (<em>Tomas Gustavsson, Muhammad Ovais Ahmad and Hina Saeeda</em>)</td></tr>
<tr><td className='text-nowrap'>13:30 - 14:00</td><td>Drawing Based Game for Teaching Empirysm and Continuous Improvement in Scrum (<em>Krzysztof Marek and Kamila Martyniuk-Sienkiewicz</em>)</td></tr>

        <tr><th className='text-center table-secondary' colSpan={2}></th></tr>
        <tr className='text-center table-primary'><th>Wed., September 3rd</th><th>Session 4B (Room 2); chaired by <em>Karolina Muszyńska</em></th></tr>
<tr><td className='text-nowrap'>15:00 - 15:05</td><td>10th Anniversary of LASD: History & Impact (<em>Adam Przybyłek</em>)</td></tr>
<tr><td className='text-nowrap'>15:05 - 15:35</td><td>Impact of Agile Software Development Team Leaders’ Mindset on Dynamic Capabilities for Achieving Organizational Agility (<em>Maciej Kucharski, Wioleta Kucharska and Jari Jussila</em>)</td></tr>
<tr><td className='text-nowrap'>15:35 - 16:05</td><td>A Case Study on Dual-Track Development in Agile Software Development (<em>Henning Rückborn and Eva-Maria Schön</em>)</td></tr>
<tr><td className='text-nowrap'>16:05 - 16:35</td><td>User Involvement in Relational Digital Transformation: A Case Study of Agile Software Development Practices in a Large Organization (<em>Morteza Moalagh, Vegard Svesengen, Babak A. Farshchian and Marius Mikalsen</em>)</td></tr>

        <tr><th className='text-center table-secondary' colSpan={2}></th></tr>
        <tr className='text-center table-primary'><th>Thu., September 4th</th><th>Session 8 - Poster Exhibit (Room 6)</th></tr>
        <tr><td className='text-nowrap' rowSpan={2}>10:30-11:30</td><td>Advanced Data Processing Algorithms and Structures for Technical Debt Management with Generative Artificial Intelligence (<em>Adam Czyżewski and Aneta Poniszewska-Maranda</em>)</td></tr>
        <tr><td>AI-Assisted HCI Design and Sprint Cadence in Scrum Software Development (<em>Slawomir Ostrowski</em>)</td></tr>

        <tr><th className='text-center table-secondary' colSpan={2}></th></tr>
        <tr className='text-center table-primary'><th>Thu., September 4th</th><th>Session 9B (Room 2); chaired by <em>TBA</em></th></tr>
<tr><td className='text-nowrap'>12:00 - 12:20</td><td>AI-based Functionalities for Project Communication Management (<em>Karolina Muszyńska and Susanne Marx</em>)</td></tr>
<tr><td className='text-nowrap'>12:20 - 12:40</td><td>Determinants of IT Project Management. The Experts Comparative Study between Poland and Serbia (<em>Anna Sołtysik-Piorunkiewicz, Witold Chmielarz, Angela Fajsi and Slobodan Moraca</em>)</td></tr>
<tr><td className='text-nowrap'>12:40 - 13:00</td><td>Non-functional Requirements Documentation Techniques in Agile Software Development: A Focus Group Study (<em>Dominik Kubiaczyk and Aleksander Jarzębowicz</em>)</td></tr>
<tr><td className='text-nowrap'>13:00 - 13:20</td><td>Effects of Remote Work on Communication in Agile Software Development: Is the Focus Still on People and Collaboration? (<em>Bärbel Bissinger, Michael Fellmann, Hauke Pruss and Nikolas Rödel</em>)</td></tr>
<tr><td className='text-nowrap'>13:20 - 13:40</td><td>Comparing Code Generation Capabilities of ChatGPT-4o and DeepSeek V3 in Solving TypeScript Programming Problems (<em>Filip Stamenković, Jelica Stanojević and Dejan Simić</em>)</td></tr>

      </tbody>
    </Table>
  </Container>
)
*/

export default Program


//    <Row className="justify-content-center my-5">
//      <Col xs lg="1"> 
//      </Col>
//
//      <Col xs lg="2"> 
//        <Image fluid src='/LNBIP_LASD22.jpg' alt='LNBIP_LASD22'/>
//      </Col>
//      <Col>
//  <h4>Lean and Agile Software Development</h4>
//  <h5>6th International Conference, LASD 2022, Virtual Event, January 22, 2022, Proceedings</h5>
//  <h4><a href="https://link.springer.com/book/10.1007/978-3-030-94238-0">LNBIP, volume 438</a></h4>          
//      <p className='mt-4'>Time zone of the conference: GMT+1 (Central European Standard Time)</p>
//      <p>Current Time:
//         <Clock 
//           format={'HH:mm:ss'}
//           ticking={true}
//           className="mx-2" />
//       </p>
//      </Col>
//     <Col xs lg="1"> 
//      </Col>
//    </Row> 


  
