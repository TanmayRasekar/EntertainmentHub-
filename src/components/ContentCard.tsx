import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const Card = styled.div<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#2a2a2a' : '#ffffff'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    border-radius: 6px;
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 4px;
    &:hover {
      transform: none; /* Disable hover effect on mobile */
      box-shadow: var(--card-shadow);
    }
  }
`;


const ImageContainer = styled.div`
  width: 100%;
  padding-top: 140%; /* Aspect ratio for a taller card */
  position: relative;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div<{ isDarkMode: boolean }>`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#2a2a2a' : '#ffffff'};
  color: ${({ isDarkMode }) => isDarkMode ? '#ffffff' : '#333333'};
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    padding: 0.9rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem;
  }
  
  @media (max-width: 320px) {
    padding: 0.6rem;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  flex-grow: 1;
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    font-size: 0.85rem;
    margin-bottom: 0.9rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.7rem;
    -webkit-line-clamp: 2;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const StarIcon = styled.span`
  color: #ffc107;
  margin-right: 0.25rem;
`;

export type ContentItem = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  rating: number;
  type: 'game' | 'movie' | 'webseries';
};

type ContentCardProps = {
  item: ContentItem;
};

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Card isDarkMode={isDarkMode}>
      <ImageContainer>
        <CardImage src={item.imageUrl} alt={item.title} />
      </ImageContainer>
      <CardContent isDarkMode={isDarkMode}>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
        <Rating>
          <StarIcon>★</StarIcon>
          {item.rating.toFixed(1)}
        </Rating>
      </CardContent>
    </Card>
  );
};

export default ContentCard;