import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.header`
  display: flex;
  z-index: 2;
  align-items: center;
  position: sticky;
  top: 0;
  width: calc(100% - 32px);
  padding: 0 16px;
  height: 53px;
  background-color: #24292e;
`;

export const ButtonAddContact = styled(Link)`
  margin-left: 16px;
  color: #24292e;
  padding: 6px 12px;
  background: #ffffff;
  border-radius: 3px;
  text-decoration: none;
`;

export const Logo = styled(Link)`
  font-size: 22px;
  color: #ffffff;
  text-decoration: none;
`;