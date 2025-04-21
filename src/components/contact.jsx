"use client"

import { useState } from "react"
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (Object.values(formData).some((value) => value === "")) {
      setError("Please fill in all fields")
      return
    }

    // Here you would typically handle the form submission logic
    console.log("Contact form submitted:", formData)

    // Show success message
    setSubmitted(true)
    setError("")

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="contact-page">
      <Container className="contact-container">
        <h2 className="text-center mb-4">Contact Us</h2>

        {submitted && (
          <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
            Your message has been sent successfully! We'll get back to you soon.
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="contact-form">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-outline-secondary">
            Back to Home
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default Contact
