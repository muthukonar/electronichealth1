import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// import Navbar from './components/Navbar';

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
    <Header></Header>
      {/* <Navbar /> */}
      <main className="flex-grow-1 mx bg-secondary text-black py-3">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
