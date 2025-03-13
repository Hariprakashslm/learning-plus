import { createContext } from 'react';
interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
}
const EditModeContext = createContext<EditModeContextType | undefined>(
  undefined
);

export default EditModeContext;
