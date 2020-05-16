import React, { useState, FC } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAddContact } from './contact.hook';
import { FlexWrapper, Description, InputUsername, Header } from './contact.style';
import { useHistory } from 'react-router-dom';
import { ButtonGreen } from 'components/shared/buttons.style';

export const AddContact: FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');

  const { addToast } = useToasts();
  
  const [addContact] = useAddContact(() => {
    setUsername('');
    history.push('/');
  }, error => {
    if (error.message.includes('E11000')) {
      addToast(
        `User with username ${username} already exists`,
        {
          appearance: 'error',
          autoDismiss: true
        }
      );
      setUsername('');
    } else {
      addToast(
        `Unknown error`,
        {
          appearance: 'error',
          autoDismiss: true
        }
      );
    }    
  });

  const addContactFunc = () => {
    if (!username) return;
    
    addContact({ variables: { username } });
  };
  return (
    <FlexWrapper>
      <div>
        <Header>Add new GitHub user</Header>
        <Description>Here you can add Github users, by their username</Description>
      </div>
      <div>
        <InputUsername
          placeholder='Enter username...'
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
      </div>
      <ButtonGreen
        onClick={addContactFunc}
      >
        Add
      </ButtonGreen>
    </FlexWrapper>
  );
};