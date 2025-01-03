import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from "react-redux";

function App() {

  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  
  return (
    <div className="dark">

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
