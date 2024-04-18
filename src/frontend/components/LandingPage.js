
import React from 'react';
import { Link } from 'react-router-dom';
import myImage from '../logo.png'; // 이미지 경로
import '../css/LandingPage2.css';
function LandingPage() {
  return (
    <div className='landing-page2'>
      {/* 이미지를 Link 컴포넌트로 감싸고 to 속성에 이동할 페이지 경로를 지정합니다. */}
      <Link to="/info">
        {/* 이미지를 클릭하여 info 페이지로 이동합니다. */}
        <img src={myImage} alt="My Image" style={{ width: '600px', height: 'auto' }} />
      </Link>
    </div>
  );
}

export default LandingPage;

