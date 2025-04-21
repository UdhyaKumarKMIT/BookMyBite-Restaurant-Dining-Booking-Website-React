"use client"
import { useState, useContext } from "react"
import { Container, Nav, Navbar, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Menu from "./Menu"
import About from "./about"
import Footer from "./Footer"
import "./home.css"

import { RestaurantContext } from "../RestaurantContext"

const Home = () => {
  const [expand, setExpand] = useState(false)
  const { user, setUser, menuItems } = useContext(RestaurantContext)

  const closeNavbar = () => setExpand(false)

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser")
    setUser(null)
  }

  return (
    <>
      <Navbar bg="light" expanded={expand} expand="lg" className="shadow-sm mynavbar">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-danger">
            <img src="logo.png" alt="" className="logo-image" />
            Thalapathy Restaurant
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpand(expand ? false : "expanded")} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={closeNavbar}>
                Home
              </Nav.Link>
              <Nav.Link href="#menu" onClick={closeNavbar}>
                Menu
              </Nav.Link>
              <Nav.Link href="#about" onClick={closeNavbar}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/book-table" onClick={closeNavbar}>
                Book Table
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={closeNavbar}>
                Contact
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/booking-history" onClick={closeNavbar}>
                    My Bookings
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => {
                      closeNavbar()
                      handleLogout()
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" onClick={closeNavbar}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero-banner">
        <img src="/bgimage.png" alt="Restaurant Interior" className="hero-image" />
        <div className="hero-overlay">
          <h1>Thalapathy Restaurant</h1>
          <p>Fine Dining Multi-cuisine Restuarant   Experience the taste and ambiance</p>
          <Button variant="danger" size="lg" as={Link} to="/book-table">
            Reserve Your Table Today
          </Button>
        </div>
      </div>

      <section id="menu-preview" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Our Popular Dishes</h2>
          <p className="text-center mb-5">Experience the Rich Taste of Indian Foods</p>

          <Row>
            {menuItems.slice(0, 4).map((item) => (
              <Col key={item.id} md={6} lg={3} className="mb-4">
                <Card className="h-100 menu-card">
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <div className="price"> {item.price}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="outline-danger" href="#menu">
              View Full Menu
            </Button>
          </div>
        </Container>
      </section>

     
      <div id="menu">
        <Menu />
      </div>

      
      <div id="about">
        <About />
      </div>

      <Footer />
    </>
  )
}

export default Home
