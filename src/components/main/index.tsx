import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Contact } from './contact';
import { AddContact } from './contact/addContact';

const MainWrapper = styled.div`
  max-width: 635px;
  height: 100%;
  margin: 0 auto;
`;
export const Main: FC = () => {
  return (
    <MainWrapper>
      <Switch>
        <Route path='/' exact component={Contact} />
        <Route path='/add' component={AddContact} />
      </Switch>
    </ MainWrapper>
  )
}