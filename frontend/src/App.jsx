import './App.css';

import { Outlet } from "react-router-dom";

// import my components 
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// import Toast Components
import { ToastContainer } from 'react-toastify';

// import Toast CSS
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <div className='App'>
        <ToastContainer 
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Navbar />
        <div className='container'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
