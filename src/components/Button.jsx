import React from 'react';
import styled from 'styled-components';

const Reset = styled.button`
  cursor: pointer;
  position: absolute;
  right: 80px;
  top: 20px;
  z-index: 1000;
`;

const Button = ({ title, setMarkers }) => {
  const handleReset = () => {
    setMarkers([]);
  };

  return (
    <Reset onClick={handleReset}>
      <img src={title} alt='button' />
    </Reset>
  );
};

export default Button;
