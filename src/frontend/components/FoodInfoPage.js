import React, { useState } from 'react';
import { Button } from 'antd';
import '../css/InputPage.css';

function FoodInfoPage() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [dailyMenus, setDailyMenus] = useState([[], [], []]);

  const handleMenuInputChange = (dayIndex, menuIndex, value) => {
    const newDailyMenus = [...dailyMenus];
    newDailyMenus[dayIndex][menuIndex] = value;
    setDailyMenus(newDailyMenus);
  };

  const handleAddMenu = (dayIndex) => {
    const newDailyMenus = [...dailyMenus];
    newDailyMenus[dayIndex].push('');
    setDailyMenus(newDailyMenus);
  };

  const handleRecommendation = async () => {
    try {
      const response = await fetch("/recommendation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: age,
          food_names: dailyMenus.flat()
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };
  
  return (
    <div className='info-page'>
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
        className='input-field'
      />
      {[0, 1, 2].map((dayIndex) => (
        <div key={dayIndex}>
          <h3>Day {dayIndex + 1}</h3>
          {dailyMenus[dayIndex].map((menu, menuIndex) => (
            <input
              key={menuIndex}
              type="text"
              value={menu}
              onChange={(e) => handleMenuInputChange(dayIndex, menuIndex, e.target.value)}
              placeholder={`Enter menu ${menuIndex + 1} for day ${dayIndex + 1}`}
              className='input-field'
            />
          ))}
          <button onClick={() => handleAddMenu(dayIndex)} className='add-menu-btn'>Add Menu</button>
        </div>
      ))}
      <Button onClick={handleRecommendation} className='submit-btn'>Get Recommendation</Button>
      {result && (
        <div>
          <h3>음식 이름: {JSON.stringify(result.food_names)}</h3>
          <h3>평균 섭취량: {JSON.stringify(result.average_intake)}</h3>
          <h3>부족한 영양소: {JSON.stringify(result.deficient_nutrients)}</h3>
          <h3>추천 영양제: {JSON.stringify(result.recommendation)}</h3>
          <h3>추천된 영양제 정보: {JSON.stringify(result.recommended_pills_info)}</h3>
        </div>
      )}
    </div>
  );
}

export default FoodInfoPage;
