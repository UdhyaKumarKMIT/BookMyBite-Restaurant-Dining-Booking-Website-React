"use client"

import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { RestaurantContext } from "../RestaurantContext"
import "./signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const { setUser } = useContext(RestaurantContext)
  const navigate = useNavigate()


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 
  const phoneRegex = /^\d{10}$/

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

   
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const savedUsers = JSON.parse(localStorage.getItem("restaurantUsers") || "[]")
    if (savedUsers.some((user) => user.email === formData.email)) {
      setError("An account with this email already exists")
      return
    }

    savedUsers.push(formData)
    localStorage.setItem("restaurantUsers", JSON.stringify(savedUsers))

     
    const loggedInUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    }

    // Save to context and localStorage
    setUser(loggedInUser)
    localStorage.setItem("restaurantUser", JSON.stringify(loggedInUser))

    // Redirect to home
    navigate("/")
  }

  return (
    <div className="main-container-signup">
      <Container className="auth-container">
        <h2 className="mb-4">Sign Up</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center align-items-center">
            <Button variant="primary" type="submit">
              Register
            </Button>

            <div className="mt-3 ms-3">
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="btn btn-outline-secondary">
              Back to Home
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Signup
