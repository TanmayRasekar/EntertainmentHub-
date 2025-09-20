import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const FooterContainer = styled.footer<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#1e1e1e' : '#ffffff'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  padding: 2rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    padding: 1.8rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 320px) {
    padding: 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    gap: 1.8rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  @media (max-width: 320px) {
    gap: 1rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    font-size: 1.15rem;
    margin-bottom: 0.9rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.05rem;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.3rem;
  }
`;

const FooterLink = styled(Link)<{ isDarkMode: boolean }>`
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <FooterContent>
        <FooterSection>
          <SectionTitle>Top Games</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="/top/games/100" isDarkMode={isDarkMode}>Top 100 Games</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Top Movies</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="/top/movies/100" isDarkMode={isDarkMode}>Top 100 Movies</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Top Web Series</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="/top/webseries/100" isDarkMode={isDarkMode}>Top 100 Web Series</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
      </FooterContent>
      
      <FooterContent style={{ marginTop: '2rem' }}>
        <FooterSection>
          <SectionTitle>Help</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="/contact" isDarkMode={isDarkMode}>Contact Us</FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink to="/faq" isDarkMode={isDarkMode}>FAQ</FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink to="/privacy" isDarkMode={isDarkMode}>Privacy Policy</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>About Us</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="/about" isDarkMode={isDarkMode}>Our Story</FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink to="/team" isDarkMode={isDarkMode}>Team</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Connect</SectionTitle>
          <LinksList>
            <LinkItem>
              <FooterLink to="#" isDarkMode={isDarkMode}>Twitter</FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink to="#" isDarkMode={isDarkMode}>Facebook</FooterLink>
            </LinkItem>
            <LinkItem>
              <FooterLink to="#" isDarkMode={isDarkMode}>Instagram</FooterLink>
            </LinkItem>
          </LinksList>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} EntertainmentHub. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;