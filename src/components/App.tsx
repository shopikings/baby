import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/Header'
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
    </Router>
  )
}

export default App
