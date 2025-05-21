import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <div className="grid grid-rows-[auto_1fr_auto] w-full h-screen">
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
