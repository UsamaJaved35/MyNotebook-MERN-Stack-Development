import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/NoteState';
import Alert from './Components/Alert';
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert/>
      <div className='container'>
      <Routes>
        <Route path="home" element={<Home />}/>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
