import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Home from 'pages/Home'
import Contact from 'pages/Contact'
import About from 'pages/About'
import Shipping from 'pages/Shipping'
import Returns from 'pages/Returns'
import Terms from 'pages/Terms'
import Privacy from 'pages/Privacy'
import Collection from 'pages/Collection'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
