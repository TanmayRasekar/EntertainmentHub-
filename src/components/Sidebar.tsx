import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const SidebarContainer = styled.aside<{ isOpen: boolean; isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#1a1a1a' : '#f0f0f0'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  padding-top: 80px;
  transform: translateX(${({ isOpen }) => isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 90;
  box-shadow: ${({ isOpen }) => isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none'};
  overflow-y: auto;
`;

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 80;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  
  @media (min-width: 1200px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  
  @media (min-width: 1200px) {
    display: none;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 20px;
  padding: 0 20px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--primary-color);
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#444' : '#ddd'};
  padding-bottom: 5px;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 8px;
`;

const SidebarLink = styled(Link)<{ isDarkMode: boolean }>`
  display: block;
  padding: 8px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ isDarkMode }) => isDarkMode ? '#333333' : '#e0e0e0'};
    color: var(--primary-color);
  }
`;

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen} isDarkMode={isDarkMode}>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        
        <CategorySection>
          <CategoryTitle theme={isDarkMode ? 'dark' : 'light'}>Games</CategoryTitle>
          <LinksList>
            <LinkItem>
              <SidebarLink to="/top/games/100" isDarkMode={isDarkMode}>Top 100 Games</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/games/50" isDarkMode={isDarkMode}>Top 50 Games</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/games/20" isDarkMode={isDarkMode}>Top 20 Games</SidebarLink>
            </LinkItem>
          </LinksList>
        </CategorySection>
        
        <CategorySection>
          <CategoryTitle theme={isDarkMode ? 'dark' : 'light'}>Movies</CategoryTitle>
          <LinksList>
            <LinkItem>
              <SidebarLink to="/top/movies/100" isDarkMode={isDarkMode}>Top 100 Movies</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/movies/50" isDarkMode={isDarkMode}>Top 50 Movies</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/movies/20" isDarkMode={isDarkMode}>Top 20 Movies</SidebarLink>
            </LinkItem>
          </LinksList>
        </CategorySection>
        
        <CategorySection>
          <CategoryTitle theme={isDarkMode ? 'dark' : 'light'}>Web Series</CategoryTitle>
          <LinksList>
            <LinkItem>
              <SidebarLink to="/top/webseries/100" isDarkMode={isDarkMode}>Top 100 Web Series</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/webseries/50" isDarkMode={isDarkMode}>Top 50 Web Series</SidebarLink>
            </LinkItem>
            <LinkItem>
              <SidebarLink to="/top/webseries/20" isDarkMode={isDarkMode}>Top 20 Web Series</SidebarLink>
            </LinkItem>
          </LinksList>
        </CategorySection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;