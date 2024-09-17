import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;

  div {
    animation: ${rotate} 0.8s linear infinite;
    border-radius: 100%;
    border: 4px solid #e3c3ca;
    border-top-color: rgba(232, 5, 55, 1);
    padding: 16px;
  }

  span {
    display: none;
  }
`;

const Loading = () => {
  return (
    <Wrapper role="status">
      <div />
      <span>Carregando ...</span>
    </Wrapper>
  );
};

export default Loading;
