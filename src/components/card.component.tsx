import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default CardWrapper;
