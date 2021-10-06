import React from 'react';
import markerSource from '../assets/images/marker.png';
import styled from 'styled-components';

const Marker = ({ positionX, positionY }) => {
  const Marker = styled.li`
    list-style: none;
    position: absolute;
    transform: translate(-40%, -87%);
    left: ${positionX}px;
    top: ${positionY}px;
  `;

  return (
    <Marker onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}>
      <img src={markerSource} alt='마커' />
    </Marker>
  );
};

export default Marker;
