import { useState } from 'react';
import '../assets/styles/app.css';
import styled from 'styled-components';

// 2907 x 3460;
import mapSource from '../assets/images/map.png';
import resetSource from '../assets/images/reset.png'

import Marker from '../components/Marker';
import Button from '../components/Button';

const Container = styled.section`
  height: 100vh;
`;

const Map = styled.div`
  width: 1024px;
  height: 768px;
  overflow: hidden;
  position: relative;
  border:2px solid red;

  img {
    position: absolute;
  }
`;

function App() {
  const [markers, setMarkers] = useState([]);
  const [isVisibleMarker, setIsVisibleMarker] = useState(true);

  const moveMarker = (x, y) => {
    const newMarkers = markers.map((marker) => {
      return {
        x: marker.x + x,
        y: marker.y + y,
      }
    });
    setMarkers(newMarkers);
  }

  // 좌클릭
  const handleMoveMap = (event) => {
    if(!event.button){
      setIsVisibleMarker(false);
      const map = event.target;
      const mapRect = map.getBoundingClientRect();
      const 움직이기전X = mapRect.x;
      const 움직이기전Y = mapRect.y;

      // 이미지에서 내가 클릭한 위치
      let shiftX = event.clientX - mapRect.left;
      let shiftY = event.clientY - mapRect.top;

      // 요소를 이동하기위한 함수
      const positionChange = (pageX, pageY) => {
        let moveX = pageX - shiftX;
        let moveY = pageY - shiftY;

        // 가로 세로 양끝 좌표
        const MIN_X = 0;
        const MAX_X = -mapRect.width + 1024;
        const MIN_Y = 0;
        const MAX_Y = -mapRect.height + 768;

        let x = moveX > MIN_X ? MIN_X : (moveX < MAX_X ? MAX_X : moveX);
        let y = moveY > MIN_Y ? MIN_Y : (moveY < MAX_Y ? MAX_Y : moveY);

        map.style.left = `${x}px`;
        map.style.top = `${y}px`;
      }

      // 마우스 무브가 되었을때 실행되는 콜백함수
      const handleMoveMap = (event) => {
        positionChange(event.pageX, event.pageY);
      }

      // 마우스버튼을 땠을때 실행되는 콜백함수
      const handleDropMap = (event) => {
        const mapRect = map.getBoundingClientRect();
        const 움직인후X = mapRect.x;
        const 움직인후Y = mapRect.y;
        moveMarker(움직인후X - 움직이기전X, 움직인후Y - 움직이기전Y);
        setIsVisibleMarker(true);
        document.body.removeEventListener('mousemove', handleMoveMap);
        document.body.removeEventListener('mouseup', handleDropMap);
      }

      document.body.addEventListener('mousemove', handleMoveMap);
      document.body.addEventListener('mouseup', handleDropMap);
    }
  }

  // 우클릭
  const handleCreateMarker = (event) => {
    event.preventDefault();
    setMarkers([...markers, {x: event.clientX, y: event.clientY}]);
  }

  return (
    <Container>
      <Map>
        <Button title={resetSource} setMarkers={setMarkers} />
        <img src={mapSource} alt="지도" 
        onDragStart={(event)=> event.preventDefault()} 
        onMouseDown={handleMoveMap}
        onContextMenu={handleCreateMarker}
        />
        { isVisibleMarker ? markers.map((marker) => (<Marker positionX={marker.x} positionY={marker.y} />)) : null }
      </Map>
    </Container>
  );
}

export default App;
