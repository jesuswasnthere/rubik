import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import AboutPage from './About';
import Me from './Me';
import CuboRubik from './components/CuboRubik';

function HomeCube() {
  return (
    <div className="cube-page">
      <h1>Cubo interactivo</h1>
      <CuboRubik />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/about">About</Link>
        <Link to="/me">Me</Link>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomeCube />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </main>
    </div>
  );
}
