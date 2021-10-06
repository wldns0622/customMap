import '../assets/styles/app.css';
import styled from 'styled-components';

// 2907 x 3460;
import mapSource from '../assets/images/map.png';

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

const handleMoveMap = (event) => {
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

    map.style.left = `${moveX > MIN_X ? MIN_X : (moveX < MAX_X ? MAX_X : moveX)}px`;
    map.style.top = `${moveX > MIN_Y ? MIN_Y : (moveY < MAX_Y ? MAX_Y : moveY)}px`;
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

function App() {
  return (
    <Container>
      <Map>
        <img src={mapSource} alt="지도" onDragStart={(event)=> event.preventDefault()} onMouseDown={handleMoveMap}/>
      </Map>
    </Container>
  );
}

export default App;
