import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { useToasts } from 'react-toast-notifications';
import {
  gql, useSubscription
} from '@apollo/client';
import { Header } from './header';
import { Main } from './main';
import { IContact } from './main/contact/contact.interface';

const NEW_CONTACT_SUBSRIBTION = gql`
  subscription onContactAdded {
    contactAdded {
      username
    }
  }
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  font-family: 'SF Pro Text', sans-serif;
  font-size: 14px;
  line-height: 18px;
`

export const App: FC = () => {

  const { addToast } = useToasts();
  
  const { data: contactAddedData } = useSubscription<{ contactAdded: IContact }>(NEW_CONTACT_SUBSRIBTION);

  useEffect(() => {
    if (!contactAddedData) return;
    addToast(
      `New contact with username '${contactAddedData.contactAdded.username}' added`,
      {
        appearance: 'success',
        autoDismiss: true
      }
    );
  }, [addToast, contactAddedData]);

  return (
    <AppWrapper>
      <Reset />
        <Header />
        <Main />
    </ AppWrapper>
  );
}