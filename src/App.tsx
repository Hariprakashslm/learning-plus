import { useState } from 'react';
import './App.css';
import menusData from './data';
import styled from 'styled-components';
import EditModeContext from './context/editMode.context';
import TiptapEditor from './components/tip-tap-editor';
import { Button } from './components/add-menu-model/components/button.component';
import ClassicMenu from './components/classic-menu.component';
import CardWrapper from './components/card.component';

const MainContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: calc(100vw - 390px);
  padding: 20px;
`;

const MainContentCardWrapper = styled(CardWrapper)`
  width: 100%;
  min-height: 80%;
`;

function App() {
  const [isEditMode, setEditMode] = useState(false);
  const [content, setContent] = useState<string>('');
  const [contents, setContents] = useState<string[]>([]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  return (
    <EditModeContext value={{ isEditMode, toggleEditMode }}>
      <MainContainer>
        <ClassicMenu menus={menusData} />
        <MainContent>
          <MainContentCardWrapper>
            <div>
              {contents.map((data) => {
                return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
              })}
              {isEditMode && (
                <>
                  <TiptapEditor onChange={(data) => setContent(data)} />
                  <Button
                    onClick={() => {
                      setContents((prevContent) => [...prevContent, content]);
                    }}
                  >
                    Add
                  </Button>
                </>
              )}
            </div>{' '}
          </MainContentCardWrapper>
        </MainContent>
      </MainContainer>
    </EditModeContext>
  );
}

export default App;
