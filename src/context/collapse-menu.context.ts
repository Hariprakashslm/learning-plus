import { createContext } from 'react';
interface CollapseMenuContextType {
  isCollapsed: boolean;
}
const CollapseMenuContext = createContext<CollapseMenuContextType | undefined>(
  undefined
);

export default CollapseMenuContext;
