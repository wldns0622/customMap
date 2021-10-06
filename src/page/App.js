import '../assets/styles/app.css';
import styled from 'styled-components';

import mapSource from '../assets/images/map.png';



const Map = styled.section`
  width: 1024px;
  height: 768px;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
  }
`;

const handleMoveMap = (event) => {
  const map = event.target;
  const mapRect = map.getBoundingClientRect()
  console.dir(map);
  let shiftX = event.clientX - mapRect.left;
  let shiftY = event.clientY - mapRect.top;

  const handleClickMap = (pageX, pageY) => {
    map.style.left = (pageX - shiftX) + 'px';
    map.style.top = (pageY - shiftY) + 'px';
  }

  const handleMoveMap = (event) => {
    handleClickMap(event.pageX, event.pageY);
  }

  const handleDropMap = () => {
    map.removeEventListener('mousemove', handleMoveMap);
    map.removeEventListener('mouseup', handleDropMap);
  }

  handleClickMap(event.pageX, event.pageY);

  map.addEventListener('mousemove', handleMoveMap);
  map.addEventListener('mouseup', handleDropMap);
  
}

function App() {
  return (
    <Map>
      <img src={mapSource} alt="지도" onDragStart={(event)=> event.preventDefault()} onMouseDown={handleMoveMap}/>
    </Map>
  );
}

export default App;
