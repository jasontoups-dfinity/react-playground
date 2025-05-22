import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Footer from './components/Footer';
import ComponentWrapper from './pages/ComponentWrapper';
import ContentContainer from './components/ContentContainer';
import { TitleProvider } from './lib/TitleContext';
import { ThemeProvider } from './lib/ThemeContext';
import { PageWidthProvider } from './lib/PageWidthContext';
import { DeveloperWrapper, DeveloperProvider } from './components/DeveloperWrapper';
import dfinityLogo from './assets/dfinity-logo.svg';
import Header from './components/Header';
import LayoutWrapper from './components/LayoutWrapper';

function App() {
  return (
    <ThemeProvider>
      <TitleProvider>
        <PageWidthProvider>
          <DeveloperProvider
            initialPosition="right"
            initialEnabledTools={{
              stateInspector: true,
              storeInspector: true,
              performanceMonitor: true,
              networkMonitor: true,
            }}>
            <Router>
              <DeveloperWrapper
                appName="React Playground"
                logo={dfinityLogo}
                showLayoutControls={true}
                showThemeToggle={true}>
                <LayoutWrapper>
                  <Header />
                  <ContentContainer>
                    <Routes>
                      <Route path="/" element={<Main />} />
                      <Route path="/component-wrapper" element={<ComponentWrapper />} />
                    </Routes>
                  </ContentContainer>
                  <Footer />
                </LayoutWrapper>
              </DeveloperWrapper>
            </Router>
          </DeveloperProvider>
        </PageWidthProvider>
      </TitleProvider>
    </ThemeProvider>
  );
}

export default App;
