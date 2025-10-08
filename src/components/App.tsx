import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Home from 'pages/Home'
import Contact from 'pages/Contact'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
