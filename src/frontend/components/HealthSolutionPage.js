import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { Link } from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트 import
import '../css/HealthSolutionPage.css';

const HealthSolutionPage = () => {
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 추가

  // 모달 열기 함수
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const healthIssues = [
    { title: "스트레스", link: "/health-solutions/stress" },
    { title: "면역력", link: "/health-solutions/immunity" },
    { title: "뼈 건강", link: "/health-solutions/bone-health" },
    { title: "눈 건강", link: "/health-solutions/eye-health" },
    { title: "장 건강", link: "/health-solutions/intestine-health" },
    // 다른 건강 고민에 대한 정보를 추가할 수 있습니다.
  ];

  return (
    <div className="health-solution-container">
      <h1 className="page-title">건강 고민별</h1>
      <div className="card-container">
        {healthIssues.map((issue, index) => (
          <Link key={index} to={issue.link} className="issue-link">
            <Card hoverable className="health-issue-card">
              <Card.Meta title={issue.title} />
            </Card>
          </Link>
        ))}
      </div>
      {/* 추천 영양제 섹션 */}
      <div className="supplements-section">
        {/* 우측에 추천 영양제 카드들 */}
        <h1 className="page-title">추천 영양제</h1>
        <div className="card-container">
          <Card
            hoverable
            className="supplement-card"
            cover={<img alt="영양제 이미지" src="/supple1.jpg" />}
          >
            <Card.Meta title="DR.ADOL+" description="칼슘 마그네슘 비타민 D+" />
            <Button className='Button' type="primary" onClick={handleOpenModal}>상세 정보</Button> {/* handleOpenModal 함수 사용 */}
          </Card>
          <Card
            hoverable
            className="supplement-card"
            cover={<img alt="영양제 이미지" src="/supple2.jpg" />}
          >
            <Card.Meta title="DR.ADOL+" description="키즈 아연 비타민D" />
            <Button className='Button' type="primary" onClick={handleOpenModal}>상세 정보</Button> {/* handleOpenModal 함수 사용 */}
          </Card>
        </div>
      </div>
      {/* 모달 */}
      <Modal
        title="영양제 상세 정보"
        visible={modalVisible} // 모달의 visible 속성
        onCancel={handleCloseModal} // 모달 닫기 버튼 클릭 시 실행되는 함수
        footer={[
          <Button key="close" onClick={handleCloseModal}>닫기</Button>
        ]}
      >
        <p>영양제의 상세 정보를 여기에 표시합니다.</p>
      </Modal>
    </div>
  );
};

export default HealthSolutionPage;