import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './frontend/Navbar';
import InputPage from './frontend/components/InputPage';
import InfoPage from './frontend/components/InfoPage';
import ProductPage from './frontend/components/ProductPage';
import InputMenuPage from './frontend/components/InputMenuPage';
import LandingPage from './frontend/components/LandingPage';
import FoodInfoPage from './frontend/components/FoodInfoPage';
import Sidebar from './Sidebar';
import RecommendationPage from './frontend/components/RecommendationPage';
import DetailPage from './frontend/components/DetailPage'
import HealthSolutionPage from './frontend/components/HealthSolutionPage';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const nutrition = [
    { id: 1, name: '비타민C' },
    { id: 2, name: '비타민B1' },
    { id: 3, name: '비타민A' },
    { id: 4, name: '비타민D' },
    { id: 5, name: '비타민B6' },
    { id: 6, name: '엽산' },
    { id: 7, name: '비타민K' },
    { id: 8, name: '비타민E' },
    { id: 9, name: '비타민B12' },
    { id: 10, name: '베타카로틴' },
    { id: 11, name: '판토텐산' },
    { id: 12, name: '비타민B2' },
    { id: 13, name: '비오틴' },
    { id: 14, name: '나이아신(비타민B3)' },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/input/inputMenu" element={<InputMenuPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/FoodInfo" element={<FoodInfoPage />} />
        <Route path="/detail" element={<DetailPage nutrition={nutrition} />} />
        <Route path="/healthSolution" element={<HealthSolutionPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
