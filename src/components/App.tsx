import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import ScrollToTop from 'components/ScrollToTop'
import { CartProvider } from 'contexts/CartContext'
import { Toaster } from 'react-hot-toast'
import Home from 'pages/Home'
import Shop from 'pages/Shop'
import ProductDetail from 'pages/ProductDetail'
import Contact from 'pages/Contact'
import About from 'pages/About'
import Shipping from 'pages/Shipping'
import Returns from 'pages/Returns'
import Terms from 'pages/Terms'
import Privacy from 'pages/Privacy'
import Collection from 'pages/Collection'
import FAQ from 'pages/FAQ'
import BlogPage from 'pages/Blog'
import Wishlist from 'pages/Wishlist'

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FAF4F0',
              color: '#444B59',
              border: '1px solid #E8A5A5',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#E8A5A5',
                secondary: '#FAF4F0'
              }
            }
          }}
        />
      </Router>
    </CartProvider>
  )
}

export default App
