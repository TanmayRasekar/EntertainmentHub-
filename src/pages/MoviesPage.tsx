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

// Mock data for movies
export const mockMovies: ContentItem[] = [
  {
    id: 1,
    title: 'Inception',
    imageUrl: 'https://via.placeholder.com/300x450/3498db/ffffff?text=Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    type: 'movie'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    imageUrl: 'https://via.placeholder.com/300x450/2ecc71/ffffff?text=Dark+Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0,
    type: 'movie'
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    imageUrl: 'https://via.placeholder.com/300x450/e74c3c/ffffff?text=Pulp+Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9,
    type: 'movie'
  },
  {
    id: 4,
    title: 'The Godfather',
    imageUrl: 'https://via.placeholder.com/300x450/f39c12/ffffff?text=Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 9.2,
    type: 'movie'
  },
  {
    id: 5,
    title: 'Interstellar',
    imageUrl: 'https://via.placeholder.com/300x450/9b59b6/ffffff?text=Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.6,
    type: 'movie'
  },
  {
    id: 6,
    title: 'The Matrix',
    imageUrl: 'https://via.placeholder.com/300x450/34495e/ffffff?text=Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    rating: 8.7,
    type: 'movie'
  },
  {
    id: 7,
    title: 'Parasite',
    imageUrl: 'https://via.placeholder.com/300x450/16a085/ffffff?text=Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rating: 8.6,
    type: 'movie'
  },
  {
    id: 8,
    title: 'Joker',
    imageUrl: 'https://via.placeholder.com/300x450/d35400/ffffff?text=Joker',
    description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.',
    rating: 8.4,
    type: 'movie'
  },
  {
    id: 9,
    title: 'The Shawshank Redemption',
    imageUrl: 'https://via.placeholder.com/300x450/8e44ad/ffffff?text=Shawshank',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    type: 'movie'
  },
  {
    id: 10,
    title: 'Avengers: Endgame',
    imageUrl: 'https://via.placeholder.com/300x450/2c3e50/ffffff?text=Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
    rating: 8.4,
    type: 'movie'
  },
  {
    id: 11,
    title: 'The Lord of the Rings: The Return of the King',
    imageUrl: 'https://via.placeholder.com/300x450/c0392b/ffffff?text=LOTR',
    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    rating: 8.9,
    type: 'movie'
  },
  {
    id: 12,
    title: 'Fight Club',
    imageUrl: 'https://via.placeholder.com/300x450/27ae60/ffffff?text=Fight+Club',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    rating: 8.8,
    type: 'movie'
  }
];

const MoviesPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<ContentItem[]>([]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockMovies.length / itemsPerPage);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchMovies = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setMovies(mockMovies.slice(startIndex, endIndex));
    };
    
    fetchMovies();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageTitle>Movies</PageTitle>
      
      <CardGrid>
        {movies.map(movie => (
          <ContentCard key={movie.id} item={movie} />
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

export default MoviesPage;