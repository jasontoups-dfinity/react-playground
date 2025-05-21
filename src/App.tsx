import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ComponentWrapper from './pages/ComponentWrapper';
import { TitleProvider } from './lib/TitleContext';
import { ThemeProvider } from './lib/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TitleProvider>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/component-wrapper" element={<ComponentWrapper />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </TitleProvider>
    </ThemeProvider>
  );
}

export default App;
