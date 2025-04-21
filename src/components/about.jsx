import { Container, Row, Col } from "react-bootstrap"
import "./about.css"

const About = () => {
  return (
    <Container className="about-container my-5">
      <h2 className="mb-4">About Food Dining</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <p>
            Founded in 1990, Thalapathy Restaurant has established itself as one the best fine dining restaurant in Chennai.
            It is the favourite restaurant for Dr. M.G. Ravichandran. Our restaurant has a great ambiance and atmosphere.
            You will have an unforgettable dining experience.
          </p>
          <p>
            Our executive chef, with over 20 years of experience cooks each disk with good taste in an clean kitchen.
            We purchase ingredients regularly .Vegetables, Meat everything is purchased from market on daily basis
          </p>
          <p>
            The ambiance at Dining reflects our dedication to taste and comfort. From intimate dinners
            to special celebrations, our attentive staff ensures that every visit is memorable.
          </p>
        </Col>
        <Col md={6}>
          <img src="/interior.png" alt="Restaurant Interior" className="img-fluid about-image" />
        </Col>
      </Row>
    </Container>
  )
}

export default About
