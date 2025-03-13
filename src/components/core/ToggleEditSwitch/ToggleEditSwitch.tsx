import { useContext } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import EditModeContext from "../../../context/EditModeContext";

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 8px;
`;

// Types for Styled Props
interface SwitchProps {
  checked: boolean;
}

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<SwitchProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.checked ? "#28a745" : "#ccc")};
  transition: 0.3s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    transform: ${(props) =>
      props.checked ? "translateX(26px)" : "translateX(0)"};
  }
`;

const EditText = styled.span<SwitchProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.checked ? "#28a745" : "#555")};
`;

const AddIcon = styled(FaPlus)<SwitchProps>`
  color: ${(props) => (props.checked ? "#28a745" : "#555")};
  font-size: 20px;
`;

const ToggleEditSwitch: React.FC<{ isSidebarOpen: boolean }> = ({
  isSidebarOpen,
}) => {
  const editModeContext = useContext(EditModeContext);
  const isEditing = !!editModeContext?.isEditMode;
  return (
    <Container>
      <SwitchContainer>
        <SwitchInput
          type="checkbox"
          checked={isEditing}
          onChange={() => editModeContext?.toggleEditMode()}
        />
        <Slider checked={isEditing} />
      </SwitchContainer>
      {isSidebarOpen && (
        <EditText checked={isEditing}>
          {isEditing ? "Edit Mode ON" : "Edit Mode OFF"}
        </EditText>
      )}
      {/* Edit Mode Indicator */}
      {isSidebarOpen && <AddIcon checked={isEditing} />}
    </Container>
  );
};

export default ToggleEditSwitch;
