import styled from 'styled-components';

export const Info = styled.p`
  margin: 30px auto;
  text-align: center;
  font-size: 20px;
`;
export const ContactList = styled.ul`
  li:not(:last-child) {
    border-bottom: 1px solid #d1d5da;
  }
`

export const ContactItem = styled.li`
  display: flex;
  padding: 5px;
  
  :hover {
    * {
      visibility: visible;
    }
  }
`;

export const ContactInfoWrapper = styled.div`
  margin-left: 10px;
  width: 395px;
`;

export const InputEdit = styled.input`
  position: absolute;
  right: 5px;
  width: 300px;
  border-radius: 0;
  border: 1px solid rgba(27,31,35,.2);
`;

export const InfoItem = styled.p`
  position: relative;
`;

export const InfoName = styled.span`
  color: #8a8a8a;
`;

export const Control = styled.div<{ alwaysVisible: boolean }>`
  visibility: ${props => props.alwaysVisible ? 'visible' : 'hidden'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 75px;
`;

export const InputUsername = styled.input`
  width: calc(100% - 16px);
  padding: 6px 8px;
  line-height: 20px;
  border-radius: 3px;
  border: 1px solid #d1d5da;
  background-color: #fafbfc;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin: 40px 0;
  flex-direction: column;
  > *:not(:last-child) {
    padding-bottom: 15px;
    border-bottom: 1px solid #d1d5da;
    margin-bottom: 20px;
  }
`;

export const Header = styled.h2`
  font-size: 24px;
  color: #24292e;
  line-height: 1.5;
`;


export const Description = styled.p`
  color: #6a737d;
`;