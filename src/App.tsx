import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Footer from './components/Footer';
import ComponentWrapper from './pages/ComponentWrapper';
import { TitleProvider } from './lib/TitleContext';
import { ThemeProvider } from './lib/ThemeContext';
import { PageWidthProvider } from './lib/PageWidthContext';
import { DeveloperWrapper, DeveloperProvider } from './components/DeveloperWrapper';
import dfinityLogo from './assets/dfinity-logo.svg';

function App() {
  return (
    <ThemeProvider>
      <TitleProvider>
        <PageWidthProvider>
          <DeveloperProvider>
            <Router>
              <DeveloperWrapper
                appName="React Playground"
                logo={dfinityLogo}
                showLayoutControls={true}
                showThemeToggle={true}>
                <div className="flex-1 flex flex-col">
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/component-wrapper" element={<ComponentWrapper />} />
                  </Routes>
                  <Footer />
                </div>
              </DeveloperWrapper>
            </Router>
          </DeveloperProvider>
        </PageWidthProvider>
      </TitleProvider>
    </ThemeProvider>
  );
}

export default App;
