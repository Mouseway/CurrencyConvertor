import React from 'react';
import CurrencyConvertor from './components/CurrencyConvertor'
import { Container } from './components/StyledComponents'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


const queryClient = new QueryClient()
const App: React.FC = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <CurrencyConvertor/>
      </Container>
    </QueryClientProvider>
  )
};

export default App;