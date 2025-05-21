import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ComponentWrapper from './pages/ComponentWrapper';
import { TitleProvider } from './lib/TitleContext';
import { ThemeProvider } from './lib/ThemeContext';
import { PageWidthProvider } from './lib/PageWidthContext';
import LayoutWrapper from './components/LayoutWrapper';

function App() {
  return (
    <ThemeProvider>
      <TitleProvider>
        <PageWidthProvider>
          <Router>
            <div className="grid grid-rows-[auto_1fr_auto] w-full h-screen">
              <Header />
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/component-wrapper" element={<ComponentWrapper />} />
                </Routes>
              </LayoutWrapper>
              <Footer />
            </div>
          </Router>
        </PageWidthProvider>
      </TitleProvider>
    </ThemeProvider>
  );
}

export default App;
