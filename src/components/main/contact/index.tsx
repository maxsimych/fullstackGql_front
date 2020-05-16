import React, { FC, useState } from 'react';
import { IContact, IEditObj, IControl, IContactInfo } from './contact.interface';
import { useDeleteContact, useEditContact, useLoadMore } from './contact.hook';
import {
  ContactList, ContactItem, ContactInfoWrapper, Info,
  InfoItem, InputEdit, InfoName, Control
} from './contact.style';
import { ButtonConfirm, Button, ButtonDanger, ButtonBlueWide } from 'components/shared/buttons.style';

const ContactInfo: FC<IContactInfo> = ({
  editObj, setEditObj, isEdit,
  username, name, email,
  location, bio
}) => (
  <ContactInfoWrapper>
    {isEdit && (
      <>
        <InfoItem><InfoName>Avatar URL: </InfoName>
          <InputEdit
            value={editObj.avatarUrl}
            onChange={ev => setEditObj({
              ...editObj,
              avatarUrl: ev.target.value
            })}
          />
        </InfoItem>
        <InfoItem><InfoName>Name: </InfoName>
          <InputEdit
            value={editObj.name}
            onChange={ev => setEditObj({
              ...editObj,
              name: ev.target.value
            })}
          />
        </InfoItem>
        <InfoItem><InfoName>Location: </InfoName>
          <InputEdit
            value={editObj.location}
            onChange={ev => setEditObj({
              ...editObj,
              location: ev.target.value
            })}
          />
        </InfoItem>
        <InfoItem><InfoName>Email: </InfoName>
          <InputEdit
            value={editObj.email}
            onChange={ev => setEditObj({
              ...editObj,
              email: ev.target.value
            })}
          />
        </InfoItem>
        <InfoItem><InfoName>Bio: </InfoName>
          <InputEdit
            value={editObj.bio}
            onChange={ev => setEditObj({
              ...editObj,
              bio: ev.target.value
            })}
          />
        </InfoItem>
      </>
    )}
    {!isEdit && (
      <>
        {username && <InfoItem><InfoName>Username: </InfoName>{username}</InfoItem>}
        {name && <InfoItem><InfoName>Name: </InfoName>{name}</InfoItem>}
        {email && <InfoItem><InfoName>Email: </InfoName>{email}</InfoItem>}
        {location && <InfoItem><InfoName>Location: </InfoName>{location}</InfoItem>}
        {bio && <InfoItem><InfoName>Bio: </InfoName>{bio}</InfoItem>}
      </>
    )}
  </ContactInfoWrapper>
);

const ControlButtons: FC<IControl> = ({
  isEdit, save, cancel, deleteItem, openEdit
}) => (
  <Control
    alwaysVisible={isEdit}
  >
    {isEdit && (
      <>
        <ButtonConfirm onClick={save}>
          Save
        </ButtonConfirm>
        <Button onClick={cancel}>
          Cancel
        </Button>
      </>
    )}
    {!isEdit && (
      <>
        <ButtonDanger onClick={deleteItem}>
          Delete
        </ButtonDanger>
        <Button onClick={openEdit}>
          Edit
        </Button>
      </>
    )}
  </Control>
);

export const Contact: FC = () => {
  const [editObj, setEditObj] = useState<IEditObj>({ id: '' });

  const {
    loading,
    error,
    contactData,
    loadMore,
    isLoadingMore
  } = useLoadMore();
  const [deleteContact] = useDeleteContact();
  const [editContact] = useEditContact(() => {
    setEditObj({ id: '' });
  });

  const saveEdited = ({
    avatarUrl, name, email, location, bio
  }: Omit<IEditObj, 'id'>) => {

    const changedObj: IEditObj = { id: editObj.id };

    if (editObj.avatarUrl !== avatarUrl) {
      changedObj.avatarUrl = editObj.avatarUrl;
    }
    if (editObj.email !== email) {
      changedObj.email = editObj.email;
    }
    if (editObj.location !== location) {
      changedObj.location = editObj.location;
    }
    if (editObj.bio !== bio) {
      changedObj.bio = editObj.bio;
    }
    if (Object.keys(changedObj).length === 1) return;

    editContact({
      variables: { ...changedObj }
    })
  }
  
  if (loading) return <Info>Loading...</Info>;
  if (error) return <Info>Error</Info>;
  if (!contactData?.moreContacts.contacts.length) return <Info>Empty</Info>;
  return (
    <>
      <ContactList>
        {contactData!.moreContacts.contacts.map(({
            id, avatarUrl, name, username,
            email, bio, location
          }: IContact) => {
            
          const isEdit = editObj.id === id;
          return (
            <ContactItem key={id}>
              <img src={avatarUrl} alt='avatar' width='150' height='150' />
              <ContactInfo
                editObj={editObj}
                setEditObj={setEditObj}
                isEdit={isEdit}
                username={username}
                name={name}
                email={email}
                location={location}
                bio={bio}
              />
              <ControlButtons
                isEdit={isEdit}
                deleteItem={() => deleteContact({ variables: { id } })}
                openEdit={() => setEditObj({
                  id,
                  avatarUrl,
                  name,
                  email,
                  location,
                  bio
                })}
                save={() => saveEdited({
                  avatarUrl,
                  name,
                  email,
                  location,
                  bio
                })}
                cancel={() => setEditObj({ id: '' })}
              />
            </ContactItem>
        )})}
      </ContactList>
      <ButtonBlueWide
        onClick={loadMore}
      >{ isLoadingMore ? 'Loading...' : 'More' }</ButtonBlueWide>
    </>  
  );
};