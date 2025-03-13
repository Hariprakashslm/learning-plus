import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'default' | 'outline' }>`
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  ${({ variant }) =>
    variant === 'outline'
      ? `
    border: 1px solid #ccc;
    background: white;
    color: #333;
    &:hover {
      background: #f0f0f0;
    }
  `
      : `
    background: #007bff;
    border: none;
    color: white;
    &:hover {
      background: #0056b3;
    }
  `}
`;
