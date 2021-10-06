import '../assets/styles/app.css';
import styled from 'styled-components';

import mapSource from '../assets/images/map.png';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Map = styled.section`
  width: 1024px;
  height: 768px;
  overflow: hidden;
`;

function App() {
  return (
    <Container>
      <Map>
        <img src={mapSource} alt="지도" />
      </Map>
    </Container>
  );
}

export default App;
