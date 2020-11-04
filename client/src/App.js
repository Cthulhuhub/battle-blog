import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Pages from './components/PageContainer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
