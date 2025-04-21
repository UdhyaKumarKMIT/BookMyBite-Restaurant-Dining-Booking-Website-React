import "./footer.css"
import { Container, Row, Col } from "react-bootstrap"
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="p-5">
          <Col md={4} sm={12}>
            <h5>Contact Us</h5>
            <p>Email: ThalapathyFood@gmail.com</p>
            <p>Phone: +91 9150653371</p>
            <p>Location: 12, MIT Campus, Chromepet, Chennai-126</p>
          </Col>
          <Col md={4} sm={12}>
            <h5>Hours of Operation</h5>
            <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
            <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
            <p>Sunday: 4:00 PM - 9:00 PM</p>
          </Col>
          <Col md={4} sm={12} className="text-md-end">
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>

            <div className="map-container mt-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215266754809!2d-73.98784492426285!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 Thalapathy Dining. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
