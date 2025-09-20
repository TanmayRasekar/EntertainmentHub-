import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const HeaderContainer = styled.header<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#1e1e1e' : '#ffffff'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)<{ isDarkMode: boolean }>`
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ isDarkMode }) => isDarkMode ? '#333333' : '#f0f0f0'};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#333333' : '#f0f0f0'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const SearchContainer = styled.div<{ isDarkMode: boolean, isActive: boolean }>`
  position: relative;
  width: ${({ isActive }) => isActive ? '250px' : '40px'};
  transition: width 0.3s ease;
  
  @media (max-width: 768px) {
    width: ${({ isActive }) => isActive ? '150px' : '40px'};
  }
`;

const SearchInput = styled.input<{ isDarkMode: boolean, isActive: boolean }>`
  width: 100%;
  padding: 0.5rem;
  padding-right: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#444' : '#ddd'};
  background-color: ${({ isDarkMode }) => isDarkMode ? '#333' : '#fff'};
  color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
  opacity: ${({ isActive }) => isActive ? '1' : '0'};
  pointer-events: ${({ isActive }) => isActive ? 'all' : 'none'};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SearchButton = styled.button<{ isDarkMode: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ isDarkMode }) => isDarkMode ? '#fff' : '#333'};
  z-index: 2;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SuggestionsList = styled.ul<{ isDarkMode: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#333' : '#fff'};
  border: 1px solid ${({ isDarkMode }) => isDarkMode ? '#444' : '#ddd'};
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li<{ isDarkMode: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ isDarkMode }) => isDarkMode ? '#444' : '#f5f5f5'};
  }
`;

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data for suggestions
  const allContent = [
    'God of War', 'The Last of Us', 'Elden Ring', 'Cyberpunk 2077', 'Red Dead Redemption 2',
    'The Witcher 3', 'Horizon Zero Dawn', 'Fortnite', 'Call of Duty', 'Minecraft',
    'Inception', 'The Dark Knight', 'Avengers: Endgame', 'Pulp Fiction', 'The Godfather',
    'Interstellar', 'The Matrix', 'Parasite', 'Joker', 'The Shawshank Redemption',
    'Breaking Bad', 'Game of Thrones', 'Stranger Things', 'The Mandalorian', 'The Office',
    'Friends', 'The Crown', 'Black Mirror', 'The Witcher', 'Money Heist'
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      const filtered = allContent.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  // Handle clicking outside search to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchActive(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle search input visibility
  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (!searchActive) {
      setTimeout(() => {
        const input = searchRef.current?.querySelector('input');
        if (input) input.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  return (
    <HeaderContainer isDarkMode={isDarkMode}>
      <Logo>EntertainmentHub</Logo>
      
      <Nav>
        <NavLink to="/games" isDarkMode={isDarkMode}>Games</NavLink>
        <NavLink to="/movies" isDarkMode={isDarkMode}>Movies</NavLink>
        <NavLink to="/webseries" isDarkMode={isDarkMode}>Web Series</NavLink>
      </Nav>
      
      <Controls>
        <SearchContainer ref={searchRef} isDarkMode={isDarkMode} isActive={searchActive}>
          <SearchInput 
            type="text" 
            placeholder="Search..." 
            isDarkMode={isDarkMode} 
            isActive={searchActive}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchButton isDarkMode={isDarkMode} onClick={toggleSearch}>
            🔍
          </SearchButton>
          
          {suggestions.length > 0 && searchActive && (
            <SuggestionsList isDarkMode={isDarkMode}>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem 
                  key={index} 
                  isDarkMode={isDarkMode}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </SearchContainer>
        
        <Button isDarkMode={isDarkMode} onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </Button>
        
        <Button isDarkMode={isDarkMode} onClick={toggleSidebar}>
          ☰
        </Button>
      </Controls>
    </HeaderContainer>
  );
};

export default Header;