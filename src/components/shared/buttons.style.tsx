import styled from 'styled-components';

export const Button = styled.button`
  padding: 6px 12px;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: 3px;
  cursor: pointer;
`;

export const ButtonDanger = styled(Button)`
  color: #cb2431;
  background-color: #fafbfc;
`;

export const ButtonConfirm = styled(Button)`
  color: #28a745;
  background-color: #fafbfc;
`;

export const ButtonGreen = styled(Button)`
  align-self: flex-start;
  color: #ffffff;
  background-color: #28a745;
`;

export const ButtonBlueWide = styled(Button)`
  margin: 10px 0;
  color: #0366d6;
  background-color: #ffffff;
  width: calc(100% - 16px);
`;