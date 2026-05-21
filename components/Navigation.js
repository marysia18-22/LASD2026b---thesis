import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = ({ edition }) => {
  const { branding, navigation } = edition

  return(
  <Navbar sticky='top' bg='white' className='shadow-sm' expand='xl'>
    <Navbar.Brand href='#home'><Image src={branding.logo} alt='AIS Logo' height='40' /></Navbar.Brand>
    <Navbar.Brand href='#home'>{branding.navTitle}</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav">
      <Nav className="ml-auto">
        {navigation.map((item) => (
            <Nav.Link key={item.id} href={`#${item.id}`}>
              {item.label}
            </Nav.Link>
          ))}
      </Nav>
    </Navbar.Collapse>

  </Navbar>
  )
}

export default Navigation

