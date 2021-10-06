import React from 'react';
import markerSource from '../assets/images/marker.png';
import styled from 'styled-components';

const Marker = ({ positionX, positionY }) => {
  // 마커 찍히는 위치가 마우스에 맞게하기위해서 고정값을 빼줌
  const Marker = styled.li`
    list-style: none;
    position: absolute;
    left: ${positionX}px;
    top: ${positionY}px;
    img {
      transform: translate(-41%, -93%);
    }
  `;

  return (
    <Marker onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}>
      <img src={markerSource} alt='마커' />
    </Marker>
  );
};

export default Marker;
