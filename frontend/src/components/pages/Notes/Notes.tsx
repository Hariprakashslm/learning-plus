import styled from 'styled-components';
import Card from '../../core/Card';
import { useState } from 'react';
import EditModeContext from '../../../context/EditModeContext';
import ClassicMenu from '../../core/ClassicMenu';
import Content from '../../core/Content';
import ResizableSidebar from '../../core/ResizableSidebar';

const MainContainer = styled.div`
  display: flex;
  width: 95vw;
  height: 90vh;
`;

const MainContent = styled.div`
  padding: 20px;
  flex: 1;
`;

const MainContentCardWrapper = styled(Card)`
  width: 100%;
  min-height: 100%;
`;

const Notes = () => {
  const [isEditMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);
  return (
    <EditModeContext value={{ isEditMode, toggleEditMode }}>
      <MainContainer>
        <ResizableSidebar>
          <ClassicMenu />
        </ResizableSidebar>

        <MainContent>
          <MainContentCardWrapper>
            <Content isEditMode={isEditMode} />
          </MainContentCardWrapper>
        </MainContent>
      </MainContainer>
    </EditModeContext>
  );
};

export default Notes;
