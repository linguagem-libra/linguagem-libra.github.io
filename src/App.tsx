import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Download } from './pages/Download';
import { About } from './pages/About';
import { Documentation } from './pages/Documentation';
import { Blog } from './pages/Blog';
import { Community } from './pages/Community';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/baixar" element={<Download />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/documentacao" element={<Documentation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/comunidade" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
