import '../assets/styles/app.css';
import styled from 'styled-components';

// 2907 x 3460;
import mapSource from '../assets/images/map.png';
import { useState } from 'react';

import Marker from '../components/Marker';

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

  // 좌클릭
  const handleMoveMap = (event) => {
    if(!event.button){
      const map = event.target;
      const mapRect = map.getBoundingClientRect();

      // 이미지에서 내가 클린한 위치
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
        const MAX_Y = -mapRect.width + 768;

        // map.style.left = `${moveX > MIN_X ? MIN_X : (moveX < MAX_X ? MAX_X : moveX)}px`;
        // map.style.top = `${moveY > MIN_Y ? MIN_Y : (moveY < MAX_Y ? MAX_Y : moveY)}px`;

        if(moveX > MIN_X) {
          map.style.left = `${MIN_X}px`;
        } else if(moveX < MAX_X) {
          map.style.left = `${MAX_X}px`;
        } else {
          map.style.left = `${moveX}px`;
        }

        if(moveY > MIN_Y) {
          map.style.top = `${MIN_Y}px`;
        } else if(moveY < MAX_Y) {
          map.style.top = `${MAX_Y}px`;
        } else {
          map.style.top = `${moveY}px`;
        }

        //마커 이동
        // let changePositionMarkers = markers.map((marker) => {
        //   return {x: marker.x + moveX, y: marker.y + moveY}
        // });

        // setMarkers(changePositionMarkers);
      }

      // 마우스 무브가 되었을때 실행되는 콜백함수
      const handleMoveMap = (event) => {
        positionChange(event.pageX, event.pageY);
      }

      // 마우스버튼을 땠을때 실행되는 콜밸함수
      const handleDropMap = () => {
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
    console.log(event)
    setMarkers([...markers, {x: event.clientX, y: event.clientY}]);
  }

  return (
    <Container>
      <Map>
        <img src={mapSource} alt="지도" 
        onDragStart={(event)=> event.preventDefault()} 
        onMouseDown={handleMoveMap}
        onContextMenu={handleCreateMarker}
        />
      </Map>
      <ul>
        { markers.map((marker) => (<Marker positionX={marker.x} positionY={marker.y} />)) }
      </ul>
    </Container>
  );
}

export default App;
