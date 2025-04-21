import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { RestaurantContext } from "../RestaurantContext"
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { setUser } = useContext(RestaurantContext)
  const navigate = useNavigate()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const submitLoginForm = (e) => {
    e.preventDefault()

  
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if(!emailRegex.test(email))
    {
      setError("Please enter a vaild email address")
      return
    }

    const savedUsers = JSON.parse(localStorage.getItem("restaurantUsers") || "[]")
    const foundUser = savedUsers.find((u) => u.email === email)

    if(!foundUser)
    {
      setError("User Not registered Signup to Book Tables")
      return 
    }
    if (foundUser.password !== password) {
      setError("Email and password doest not match")
      return
    }

    const loggedInUser = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      phone: foundUser.phone,
    }

    setUser(loggedInUser)
    localStorage.setItem("restaurantUser", JSON.stringify(loggedInUser))

    navigate("/")
  }

  return (
    <div className="main-container-login">
      <div className="auth-container">
        <h2 className="mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submitLoginForm} className="form-container">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center">
            <Button variant="primary" type="submit">
              Login
            </Button>

            <div className="mt-3 ms-3">
              <span>Don't have an account? </span>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="btn btn-outline-secondary">
              Back to Home
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
