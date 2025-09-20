import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';
import GamesPage from './pages/GamesPage.tsx';
import MoviesPage from './pages/MoviesPage.tsx';
import WebseriesPage from './pages/WebseriesPage.tsx';
import TopContentPage from './pages/TopContentPage.tsx';
import { useTheme } from './contexts/ThemeContext';

const AppContainer = styled.div<{ isDarkMode: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#121212' : '#f5f5f5'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  transition: all 0.3s ease;
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  display: flex;
  flex: 1;
  padding: 20px;
  margin-left: ${({ sidebarOpen }) => sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  
  /* Tablets and below */
  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 15px;
  }
  
  /* Mobile phones */
  @media (max-width: 480px) {
    padding: 10px;
  }
  
  /* Small phones */
  @media (max-width: 320px) {
    padding: 5px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AppContainer isDarkMode={isDarkMode}>
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent sidebarOpen={sidebarOpen}>
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<GamesPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/webseries" element={<WebseriesPage />} />
              <Route path="/top/:category/:count" element={<TopContentPage />} />
            </Routes>
          </ContentWrapper>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;