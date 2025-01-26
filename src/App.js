import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './comp/Header';
import Home from './comp/Home';
import Top from './comp/Top';
import Upcoming from './comp/Upcoming';
import Desc from './comp/Desc';
import './App.css';
import Footer from './comp/Footer';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query updates
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
        <Route path='/top-pick' element={<Top searchQuery={searchQuery} />} />
        <Route path='/upcoming' element={<Upcoming searchQuery={searchQuery}/>} />
        <Route path='/movie/:id' element={<Desc />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
