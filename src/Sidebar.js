import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa'; // X 아이콘 import

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  height: 100%;
  width: 250px;
  background-color: #f8f7f6;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: left 0.3s ease;
`;
const SidebarHeader = styled.div`
  padding: 20px;
  background-color: #a7e87c; /* 진한 연두색 */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const SidebarLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: "Gowun Dodum", sans-serif;
  color: #ffffff;
`;

const SidebarNav = styled.ul`
  list-style-type: none;
  padding: 20px 0; /* Nav 아이템 위아래 공백 조정 */
  margin: 0;
`;

const SidebarNavItem = styled.li`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SidebarNavLink = styled(Link)`
  text-decoration: none;
  color: #333333;
  font-family: "Gowun Dodum", sans-serif;
`;

const CloseIcon = styled(FaTimes)`
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarLogo>Nutri Guide</SidebarLogo>
        <CloseIcon onClick={toggleSidebar} />
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarNavLink to="/" onClick={toggleSidebar}>Home</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/info" onClick={toggleSidebar}>Info</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/recommendation" onClick={toggleSidebar}>추천받기</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/product" onClick={toggleSidebar}>Product</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/healthsolution" onClick={toggleSidebar}>고민별</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/healthsolution" onClick={toggleSidebar}>성분별</SidebarNavLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarNavLink to="/healthsolution" onClick={toggleSidebar}>연령별</SidebarNavLink>
        </SidebarNavItem>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
