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

// Mock data for web series
export const mockWebseries: ContentItem[] = [
  {
    id: 1,
    title: 'Breaking Bad',
    imageUrl: 'https://via.placeholder.com/300x450/3498db/ffffff?text=Breaking+Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.',
    rating: 9.5,
    type: 'webseries'
  },
  {
    id: 2,
    title: 'Game of Thrones',
    imageUrl: 'https://via.placeholder.com/300x450/2ecc71/ffffff?text=Game+of+Thrones',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    rating: 9.3,
    type: 'webseries'
  },
  {
    id: 3,
    title: 'Stranger Things',
    imageUrl: 'https://via.placeholder.com/300x450/e74c3c/ffffff?text=Stranger+Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    rating: 8.7,
    type: 'webseries'
  },
  {
    id: 4,
    title: 'The Mandalorian',
    imageUrl: 'https://via.placeholder.com/300x450/f39c12/ffffff?text=Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    rating: 8.8,
    type: 'webseries'
  },
  {
    id: 5,
    title: 'The Office',
    imageUrl: 'https://via.placeholder.com/300x450/9b59b6/ffffff?text=The+Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    rating: 8.9,
    type: 'webseries'
  },
  {
    id: 6,
    title: 'Friends',
    imageUrl: 'https://via.placeholder.com/300x450/34495e/ffffff?text=Friends',
    description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    rating: 8.5,
    type: 'webseries'
  },
  {
    id: 7,
    title: 'The Crown',
    imageUrl: 'https://via.placeholder.com/300x450/16a085/ffffff?text=The+Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    rating: 8.7,
    type: 'webseries'
  },
  {
    id: 8,
    title: 'Black Mirror',
    imageUrl: 'https://via.placeholder.com/300x450/d35400/ffffff?text=Black+Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    rating: 8.8,
    type: 'webseries'
  },
  {
    id: 9,
    title: 'The Witcher',
    imageUrl: 'https://via.placeholder.com/300x450/8e44ad/ffffff?text=The+Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    rating: 8.2,
    type: 'webseries'
  },
  {
    id: 10,
    title: 'Money Heist',
    imageUrl: 'https://via.placeholder.com/300x450/2c3e50/ffffff?text=Money+Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    rating: 8.3,
    type: 'webseries'
  },
  {
    id: 11,
    title: 'The Queen\'s Gambit',
    imageUrl: 'https://via.placeholder.com/300x450/c0392b/ffffff?text=Queens+Gambit',
    description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    rating: 8.6,
    type: 'webseries'
  },
  {
    id: 12,
    title: 'Westworld',
    imageUrl: 'https://via.placeholder.com/300x450/27ae60/ffffff?text=Westworld',
    description: 'At the intersection of the near future and the reimagined past, waits a world in which every human appetite can be indulged without consequence.',
    rating: 8.6,
    type: 'webseries'
  }
];

const WebseriesPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [webseries, setWebseries] = useState<ContentItem[]>([]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockWebseries.length / itemsPerPage);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchWebseries = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setWebseries(mockWebseries.slice(startIndex, endIndex));
    };
    
    fetchWebseries();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageTitle>Web Series</PageTitle>
      
      <CardGrid>
        {webseries.map(series => (
          <ContentCard key={series.id} item={series} />
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

export default WebseriesPage;