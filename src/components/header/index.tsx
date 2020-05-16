import React, { FC } from 'react';
import { Wrapper, Logo, ButtonAddContact } from './header.style';

export const Header: FC = () => {
  return (
    <Wrapper>
      <Logo to='/'>GitHub Address Book</Logo>
      <ButtonAddContact to='/add'>Add contact</ButtonAddContact>
    </Wrapper>
  )
}