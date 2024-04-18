import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../lemon.jpg'; // 이미지 경로 수정 필요

const RecommendationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-align: center;
  max-width: 600px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const RecommendButton = styled(Link)`
  background-color: #ffffff;
  color: #333333;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f7d06d;
  }
`;

const RecommendationPage = () => {
  return (
    <RecommendationPageContainer>
      <Title>AI 영양제 추천 서비스</Title>
      <Description>간단한 정보 입력으로 최적의 영양제를 추천해드립니다.</Description>
      <RecommendButton to="/input">추천받기</RecommendButton>
    </RecommendationPageContainer>
  );
};

export default RecommendationPage;
