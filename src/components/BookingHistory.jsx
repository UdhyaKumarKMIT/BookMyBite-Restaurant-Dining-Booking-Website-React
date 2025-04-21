
import { useContext, useEffect } from "react"
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "./BookingHistory.css"
import { RestaurantContext } from "../RestaurantContext"

const BookingHistory = () => {
  const { user, bookings, setBookings } = useContext(RestaurantContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleCancel = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "Cancelled" } : booking,
    )

    setBookings(updatedBookings)
    localStorage.setItem("restaurantBookings", JSON.stringify(updatedBookings))
  }

  const formatDateTime = (date, time) => {
    const bookingDate = new Date(date)
    const formattedDate = bookingDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    
    let [hours, minutes] = time.split(":")
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12
    const formattedTime = `${hours}:${minutes} ${ampm}`

    return `${formattedDate} at ${formattedTime}`
  }

  return (
    <div className="booking-history-page">
      <div className="back-button-container">
        <Button as={Link} to="/" variant="outline-secondary" className="back-button">
          Back to Home
        </Button>
      </div>

      <Container className="booking-history-container">
        <h2 className="text-center mb-4">Your Reservations</h2>

        {bookings.length === 0 ? (
          <div className="no-bookings-message">
            <p>You don't have any reservations yet.</p>
            <Button as={Link} to="/book-table" variant="primary">
              Book a Table
            </Button>
          </div>
        ) : (
          <Row>
            {bookings.map((booking) => (
              <Col key={booking.id} xs={12} className="mb-4">
                <Card className="booking-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title>
                          Reservation for {booking.guests} {booking.guests === 1 ? "person" : "people"}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {formatDateTime(booking.date, booking.time)}
                        </Card.Subtitle>
                      </div>
                      <Badge bg={booking.status === "Confirmed" ? "success" : "danger"} className="status-badge">
                        {booking.status}
                      </Badge>
                    </div>

                    <Card.Text className="mt-3">
                      <strong>Name:</strong> {booking.firstName} {booking.lastName}
                      <br />
                      <strong>Phone:</strong> {booking.phone}
                      <br />
                      {booking.specialRequests && (
                        <>
                          <strong>Special Requests:</strong> {booking.specialRequests}
                        </>
                      )}
                    </Card.Text>

                    {booking.status === "Confirmed" && (
                      <Button variant="outline-danger" onClick={() => handleCancel(booking.id)} className="mt-2">
                        Cancel Reservation
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-4">
          <Button as={Link} to="/book-table" variant="primary">
            Make a New Reservation
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default BookingHistory
