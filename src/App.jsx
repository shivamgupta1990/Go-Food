import './App.css'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './screens/Login'
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './screens/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/ContextReducer.jsx'
import MyOrder from './screens/MyOrder.jsx'


function App() {


  return (
    <div>
      <CartProvider>
        <Router>
          <ToastContainer position="top-center" />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/myOrder' element={<MyOrder/>}/>
          </Routes>
          <Footer />
        </Router>
      </CartProvider>


    </div>

  )
}

export default App
