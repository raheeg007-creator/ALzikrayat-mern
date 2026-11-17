import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import LoginRegister from './pages/LoginRegister';
import AddPhoto from './pages/AddPhoto';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/add-photo" element={<AddPhoto />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;