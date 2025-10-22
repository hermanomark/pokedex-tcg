import { useEffect } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Layout from './layout'
import { getAllCards, getCardById } from './services/cards'

const App = () => {

  const fetchCards = async () => {
    try {
      const response = await getAllCards();
      console.log('Fetched cards:', response);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const fetchCardById = async (id: string) => {
    try {
      const response = await getCardById(id);
      console.log('Fetched card by ID:', response);
    } catch (error) {
      console.error('Error fetching card by ID:', error);
    }
  };

  useEffect(() => {
    fetchCards();

    fetchCardById('xy7-54');
  }, []);

  return (
    <>
      <Layout>
        <Button variant="secondary">Secondary Action</Button>
      </Layout>
    </>
  )
}

export default App
