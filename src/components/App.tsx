import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import ScrollToTop from 'components/ScrollToTop'
import { CartProvider } from 'contexts/CartContext'
import { WishlistProvider } from 'contexts/WishlistContext'
import { Toaster } from 'react-hot-toast'
import Home from 'pages/Home'
import Shop from 'pages/Shop'
import ProductDetail from 'pages/ProductDetail'
import Contact from 'pages/Contact'
import About from 'pages/About'
import Shipping from 'pages/Shipping'
import Terms from 'pages/Terms'
import Privacy from 'pages/Privacy'
import RefundPolicy from 'pages/RefundPolicy'
import Collection from 'pages/Collection'
import FAQ from 'pages/FAQ'
import BlogPage from 'pages/Blog'
import BlogPost from 'pages/BlogPost'
import Wishlist from 'pages/Wishlist'

// import { useProducts } from 'shopify/products/useShopify'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<RefundPolicy />} />
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
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
