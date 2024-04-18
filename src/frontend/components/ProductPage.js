import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../css/ProductPage.css';

// BMI 정보를 보여주는 새로운 컴포넌트
const BMIInfo = ({ bmiResult }) => {
  return (
    <div className="bmi-info-container">
      <div className="bmi-info-border">
        <h2 className="bmi-info-title">BMI 측정 결과</h2>
        <p className="bmi-info-value">당신의 BMI 지수: {bmiResult}</p>
        {/* 필요시 BMI에 관한 더 많은 정보를 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bmiResult, setBMIResult] = useState(null); // BMI 결과를 저장하기 위한 상태

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // BMI를 계산하는 함수
  const calculateBMI = () => {
    // BMI 계산 로직을 여기에 구현합니다.
    // 예시로, 랜덤 값을 사용하겠습니다.
    const randomBMI = Math.random() * 30 + 15; // 15에서 45 사이의 랜덤 값
    setBMIResult(randomBMI.toFixed(2)); // 소수점 둘째 자리까지 BMI 결과를 설정합니다.
  };

  // 컴포넌트가 마운트될 때 한 번만 calculateBMI 호출
  useEffect(() => {
    calculateBMI();
  }, []); // 빈 의존성 배열은 한 번만 실행됨을 보장합니다.

  return (
    <div className="page-container">
      <div className="info-section">
        {/* 좌측에 BMI 정보 */}
        <BMIInfo bmiResult={bmiResult} />
        {/* 우측에 평균 섭취량 정보 */}
        <div className="average-intake-container">
          <div className="average-intake-border">
            <h2 className="average-intake-title">평균 섭취량</h2>
            <p className="average-intake-value">당신의 섭취량: X</p>
            {/* 필요시 섭취량에 관한 더 많은 정보를 추가할 수 있습니다 */}
          </div>
        </div>
      </div>
      <div className="supplements-section">
        {/* 우측에 추천 영양제 카드들 */}
        <h1 className="page-title">추천 영양제</h1>
        <div className="card-container">
        <Card
  hoverable
  className="supplement-card"
  cover={<img alt="영양제 이미지" src="/supple1.jpg" />}
>
  <div className="card-content">
    <h3 className="supplement-title">DR.ADOL+</h3>
    <p className="supplement-description">칼슘 마그네슘 비타민 D+</p>
    <Button className='Button' type="primary" onClick={handleOpenModal}>상세 정보</Button>
  </div>
</Card>
          <Card
            hoverable
            className="supplement-card"
            cover={<img alt="영양제 이미지" src="/supple2.jpg" />}
          >
            <Card.Meta
              title={<span>DR.ADOL+ <Button className='Button' type="primary" onClick={handleOpenModal}>상세 정보</Button></span>}
              description="키즈 아연 비타민D"
            />
          </Card>
          
        </div>
      </div>
      <Modal
        title="영양제 상세 정보"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>닫기</Button>
        ]}
      >
        <p>영양제의 상세 정보를 여기에 표시합니다.</p>
      </Modal>
    </div>
  );
};

export default ProductPage;