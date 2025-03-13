import { useState } from 'react';
import './App.css';
import MenuComponent from './components/menu.component';
import ToggleButton from './components/toggle-buttom.component';
import menusData from './data';
import styled from 'styled-components';
import EditModeContext from './context/editMode.context';
import TiptapEditor from './components/tip-tap-editor';
import { Button } from './components/add-menu-model/components/button.component';

const MainContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: full;
`;

const Nav = styled.div``;

function App() {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<string>('');
  const [contents, setContents] = useState<string[]>([]);
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
          <div>
            {contents.map((data) => {
              return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
            })}

            <TiptapEditor onChange={(data) => setContent(data)} />
            <Button
              onClick={() => {
                setContents((prevContent) => [...prevContent, content]);
              }}
            >
              Add
            </Button>
          </div>
        </MainContent>
      </MainContainer>
    </EditModeContext>
  );
}

export default App;
