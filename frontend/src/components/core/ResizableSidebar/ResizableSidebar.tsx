import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ResizableSidebarProps {
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}

const DragHandle = styled.div`
  width: 5px;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  z-index: 10;

  &:hover {
    background-color: #666;
  }
`;

const SidebarContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  background-color: #1e1e2f;
  height: 100vh;
  position: relative;
  transition: width 0.2s ease;
  overflow-x: hidden;
`;

const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
  minWidth = 200,
  maxWidth = 500,
  children,
}) => {
  const [width, setWidth] = useState<number>(() => {
    return parseInt(localStorage.getItem('sidebarWidth') || `${minWidth}`);
  });

  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        localStorage.setItem('sidebarWidth', width.toString());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [width, minWidth, maxWidth]);

  return (
    <SidebarContainer width={width}>
      {children}
      <DragHandle
        onMouseDown={() => {
          isResizing.current = true;
        }}
      />
    </SidebarContainer>
  );
};

export default ResizableSidebar;
