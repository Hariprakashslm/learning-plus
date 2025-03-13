import { useState } from 'react';
import './App.css';
import MenuComponent from './components/menu.component';
import ToggleButton from './components/toggle-buttom.component';
import menusData from './data';
import styled from 'styled-components';
import EditModeContext from './context/editMode.context';

const MainContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: full;
`;

const Nav = styled.div``;
function App() {
  const [editMode, setEditMode] = useState(false);
  return (
    <EditModeContext value={editMode}>
      <MainContainer>
        <MenuComponent menus={menusData} />
        <MainContent>
          <Nav>
            <ToggleButton
              editMode={editMode}
              onToggle={() => setEditMode(!editMode)}
            />
          </Nav>
        </MainContent>
      </MainContainer>
    </EditModeContext>
  );
}

export default App;
