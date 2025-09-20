import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

// Import mock data from other pages
import { mockGames } from './GamesPage';
import { mockMovies } from './MoviesPage';
import { mockWebseries } from './WebseriesPage';

// Using the imported mock data from other pages

// Helper function to get the appropriate data based on category
const getDataByCategory = (category: string): ContentItem[] => {
  switch (category) {
    case 'games':
      return mockGames;
    case 'movies':
      return mockMovies;
    case 'webseries':
      return mockWebseries;
    default:
      return [];
  }
};

const TopContentPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { category, count } = useParams<{ category: string; count: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState<ContentItem[]>([]);
  
  const itemsPerPage = 6;
  const maxItems = parseInt(count || '20', 10);
  const allContent = getDataByCategory(category || 'games');
  
  // Sort content by rating (highest first) and limit to the requested count
  const topContent = [...allContent]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxItems);
    
  const totalPages = Math.ceil(Math.min(topContent.length, maxItems) / itemsPerPage);
  
  useEffect(() => {
    // Reset to page 1 when category or count changes
    setCurrentPage(1);
  }, [category, count]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchContent = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setContent(topContent.slice(startIndex, endIndex));
    };
    
    fetchContent();
  }, [currentPage, topContent]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Format the title based on the category and count
  const formatTitle = () => {
    const categoryName = category === 'webseries' ? 'Web Series' : 
                        category === 'movies' ? 'Movies' : 'Games';
    return `Top ${count} ${categoryName}`;
  };
  
  return (
    <PageContainer>
      <PageTitle>{formatTitle()}</PageTitle>
      
      <CardGrid>
        {content.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </CardGrid>
      
      {totalPages > 1 && (
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
      )}
    </PageContainer>
  );
};

export default TopContentPage;