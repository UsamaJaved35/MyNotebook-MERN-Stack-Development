import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />}/> */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
