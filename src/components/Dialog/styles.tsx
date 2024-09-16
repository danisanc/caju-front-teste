import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styled, { keyframes } from 'styled-components';

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Root = styled(AlertDialog.Root)``;

export const Trigger = styled(AlertDialog.Trigger)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
`;

export const Portal = styled(AlertDialog.Portal)``;

export const Overlay = styled(AlertDialog.Overlay)`
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #000000b3;
  inset: 0;
  position: fixed;
`;

export const Content = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

export const Title = styled(AlertDialog.Title)`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  font-size: 15px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 8px;
`;

export const Cancel = styled(AlertDialog.Cancel)`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  background-color: #fbedf6;
  color: #000;
  cursor: pointer;
`;

export const Action = styled(AlertDialog.Action)`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  background-color: #64a98c;
  color: #fff;
  cursor: pointer;
`;
