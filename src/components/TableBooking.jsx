"use client"

import { useState, useEffect, useContext } from "react"
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RestaurantContext } from "../RestaurantContext"
import "./TableBooking.css"

const TableBooking = () => {
  const { user, bookings, setBookings } = useContext(RestaurantContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      }))
    } else {
    
      navigate("/login")
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const formattedDate = tomorrow.toISOString().split("T")[0]

    setFormData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }))
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.date || !formData.time) {
      setError("Please fill in all required fields")
      return
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    const newBooking = {
      id: Date.now(),
      ...formData,
      status: "Confirmed",
    }

    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)

    localStorage.setItem("restaurantBookings", JSON.stringify(updatedBookings))

    setSubmitted(true)
    setError("")

    setFormData({
      ...formData,
      guests: 2,
      date: formData.date,
      time: "",
      specialRequests: "",
    })

    window.scrollTo(0, 0)
  }

  return (
    <div className="booking-page">
      <Container className="booking-container">
        <h2 className="text-center mb-4">Reserve Your Table</h2>

        {submitted && (
          <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
            Your table has been reserved successfully! We look forward to serving you.
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={user}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={user}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={user}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control as="select" name="guests" value={formData.guests} onChange={handleChange} required>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "person" : "people"}
                    </option>
                  ))}
                  <option value="9+">9+ people (large party)</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control as="select" name="time" value={formData.time} onChange={handleChange} required>
                  <option value="">Select a time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Special Requests</Form.Label>
            <Form.Control
              as="textarea"
              name="specialRequests"
              rows={3}
              placeholder="Special occasions, seating preferences, etc."
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Reserve Table
            </Button>

            <Link to="/" className="btn btn-outline-secondary">
              Back to Home
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default TableBooking
