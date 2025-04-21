"use client"

import { useContext } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { RestaurantContext } from "../RestaurantContext"
import "./Menu.css"

const Menu = () => {
  const { menuItems } = useContext(RestaurantContext)

  const categories = [
    { name: "Main Dishes", items: menuItems },
  
    {
      name: "Desserts",
      items: [
        {
          id: 7,
          title: "PipeApple Halwa",
          description: "Delicious PipeApple Halwa made with Jaggery .Taste goods and good for health",
          price: "100",
          image: "/pine.png",
        },
        {
          id: 8,
          title: "Milk Payasam",
          description: "Tasty Payasam made with fresh milk and sugar seasoned with dry fruits and nuts",
          price: "120",
          image: "/palpayasam.png",
        },
      ],
    },
  ]

  return (
    <Container className="menu-container my-5">
      <h2 className="text-center mb-4">Our Menu</h2>

      {categories.map((category, index) => (
        <div key={index} className="mb-5">
          <h3 className="category-title">{category.name}</h3>
          <Row>
            {category.items.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="menu-item-card h-100">
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  )
}

export default Menu
