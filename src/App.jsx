
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/signup"
import Login from "./components/login"
import Contact from "./components/contact"
import BookingHistory from "./components/BookingHistory"
import TableBooking from "./components/TableBooking"
import "bootstrap/dist/css/bootstrap.min.css"

import { RestaurantContext } from "./RestaurantContext"
import { useState, useEffect } from "react"

const App = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Tamil Nadu Veg Meals",
      description: "Tamil Nadu famous vegetarian meals served in banana leaf .Rice, Sambar, Dhal, Rasam, Poriyal, Kottu, Pappad, Payasam",
      price: "399",
      image: "/tn.png",
    },
    {
      id: 2,
      title: "Kerala Veg Meals",
      description: "Tasty kerala style veg meals with complimentary juice .Experience the taste of chetta .",
      price: "450",
      image: "/kerala.png",
    },
    {
      id: 3,
      title: "Andhra Veg Meals",
      description: "Andhra famous vegetarian meals served in banana leaf .Rice, Sambar,Podi, Dhal, Rasam, Poriyal, Kottu, Pappad, Payasam",
      price: "300",
      image: "/andhra.png",
    },
    {
      id: 4,
      title: "Panneer Poratta",
      description: "Roasted vegetables and pannneer wrapped in dough and baked in air-fry",
      price: "200",
      image: "/paneer.png",
    },
    {
      id: 5,
      title: "Delhi Dhaba",
      description: "Most Spicest Delhi foods that taste much than what you expect",
      price: "400",
      image: "/delhi.png",
    },
    {
      id: 6,
      title: "Panneer Poratta",
      description: "Roasted vegetables and pannneer wrapped in dough and baked in air-fry",
      price: "200",
      image: "/paneer.png",
    },
  ])

 

  useEffect(() => {
    const loggedInUser = localStorage.getItem("restaurantUser")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
    const savedBookings = localStorage.getItem("restaurantBookings")
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }, [])

  return (
    <RestaurantContext.Provider value={{ menuItems, setMenuItems, user, setUser, bookings, setBookings }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/book-table" element={<TableBooking />} />
        </Routes>
      </Router>
    </RestaurantContext.Provider>
  )
}

export default App
