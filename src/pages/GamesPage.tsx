import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentCard, { ContentItem } from '../components/ContentCard';
import { useTheme } from '../contexts/ThemeContext';

const PageContainer = styled.div`
  padding: 1rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean; isDarkMode: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${({ active, isDarkMode }) => 
    active ? 'var(--primary-color)' : isDarkMode ? '#333333' : '#f0f0f0'};
  color: ${({ active }) => active ? '#ffffff' : 'inherit'};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${({ active }) => active ? 'var(--primary-color)' : 'var(--secondary-color)'};
    color: #ffffff;
  }
`;

// Mock data for games
export const mockGames: ContentItem[] = [
  {
    id: 1,
    title: 'God of War',
    imageUrl: 'https://via.placeholder.com/300x450/3498db/ffffff?text=God+of+War',
    description: 'An action-adventure game that follows Kratos, a former Greek god, as he journeys with his son in the realm of Norse gods.',
    rating: 9.5,
    type: 'game'
  },
  {
    id: 2,
    title: 'The Last of Us Part II',
    imageUrl: 'https://via.placeholder.com/300x450/2ecc71/ffffff?text=Last+of+Us+II',
    description: 'A post-apocalyptic action-adventure game focusing on the journey of Ellie and her quest for vengeance.',
    rating: 9.3,
    type: 'game'
  },
  {
    id: 3,
    title: 'Elden Ring',
    imageUrl: 'https://via.placeholder.com/300x450/e74c3c/ffffff?text=Elden+Ring',
    description: 'An action RPG set in a fantasy open world filled with danger and adventure.',
    rating: 9.7,
    type: 'game'
  },
  {
    id: 4,
    title: 'Cyberpunk 2077',
    imageUrl: 'https://via.placeholder.com/300x450/f39c12/ffffff?text=Cyberpunk+2077',
    description: 'An open-world action-adventure RPG set in a dystopian future where body modification is the norm.',
    rating: 8.5,
    type: 'game'
  },
  {
    id: 5,
    title: 'Red Dead Redemption 2',
    imageUrl: 'https://via.placeholder.com/300x450/9b59b6/ffffff?text=RDR2',
    description: 'An epic tale of life in America\'s unforgiving heartland, following outlaw Arthur Morgan.',
    rating: 9.6,
    type: 'game'
  },
  {
    id: 6,
    title: 'The Witcher 3',
    imageUrl: 'https://via.placeholder.com/300x450/34495e/ffffff?text=Witcher+3',
    description: 'A story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices.',
    rating: 9.8,
    type: 'game'
  },
  {
    id: 7,
    title: 'Horizon Zero Dawn',
    imageUrl: 'https://via.placeholder.com/300x450/16a085/ffffff?text=Horizon',
    description: 'An exhilarating action RPG where you play as Aloy, a hunter in a world overrun by machines.',
    rating: 9.2,
    type: 'game'
  },
  {
    id: 8,
    title: 'Ghost of Tsushima',
    imageUrl: 'https://via.placeholder.com/300x450/d35400/ffffff?text=Ghost+of+Tsushima',
    description: 'An open-world action-adventure game set in feudal Japan, where you play as a samurai warrior.',
    rating: 9.4,
    type: 'game'
  },
  {
    id: 9,
    title: 'Hades',
    imageUrl: 'https://via.placeholder.com/300x450/8e44ad/ffffff?text=Hades',
    description: 'A rogue-like dungeon crawler where you defy the god of the dead as you hack and slash out of the Underworld.',
    rating: 9.1,
    type: 'game'
  },
  {
    id: 10,
    title: 'Death Stranding',
    imageUrl: 'https://via.placeholder.com/300x450/2c3e50/ffffff?text=Death+Stranding',
    description: 'An action game set in an apocalyptic United States, where you play as a courier delivering supplies to isolated colonies.',
    rating: 8.8,
    type: 'game'
  },
  {
    id: 11,
    title: 'Control',
    imageUrl: 'https://via.placeholder.com/300x450/c0392b/ffffff?text=Control',
    description: 'A supernatural third-person action-adventure game where you battle a deadly enemy known only as the Hiss.',
    rating: 8.9,
    type: 'game'
  },
  {
    id: 12,
    title: 'Sekiro: Shadows Die Twice',
    imageUrl: 'https://via.placeholder.com/300x450/27ae60/ffffff?text=Sekiro',
    description: 'An action-adventure game that follows a shinobi known as Wolf as he attempts to take revenge on a samurai clan.',
    rating: 9.0,
    type: 'game'
  }
];

const GamesPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<ContentItem[]>([]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockGames.length / itemsPerPage);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchGames = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setGames(mockGames.slice(startIndex, endIndex));
    };
    
    fetchGames();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageTitle>Games</PageTitle>
      
      <CardGrid>
        {games.map(game => (
          <ContentCard key={game.id} item={game} />
        ))}
      </CardGrid>
      
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PageButton 
            key={page} 
            active={page === currentPage}
            isDarkMode={isDarkMode}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </Pagination>
    </PageContainer>
  );
};

export default GamesPage;