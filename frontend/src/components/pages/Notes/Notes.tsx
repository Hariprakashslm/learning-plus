import styled from "styled-components";
import Card from "../../core/Card";
import { useState } from "react";
import menusData from "../../../data";
import EditModeContext from "../../../context/EditModeContext";
import ClassicMenu from "../../core/ClassicMenu";
import Content from "../../core/Content";

const MainContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  padding: 20px;
  flex: 1;
`;

const MainContentCardWrapper = styled(Card)`
  width: 100%;
  min-height: 80%;
`;

const Notes = () => {
  const [isEditMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);
  return (
    <EditModeContext value={{ isEditMode, toggleEditMode }}>
      <MainContainer>
        <ClassicMenu />
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
