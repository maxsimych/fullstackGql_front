import { useMutation, useQuery, ApolloError } from '@apollo/client';
import { useState } from 'react';
import {
  CONTACT_DELETE, CONTACT_GET_MORE, CONTACT_ADD, CONTACT_EDIT
} from './contact.query';
import {
  IContact, IAddContact, IOnCompleted, IGetContacts, IDeleteContact, ILoadMore
} from './contact.interface';

export const useLoadMore = (): ILoadMore => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    loading,
    error,
    data: contactData,
    fetchMore
  } = useQuery<IGetContacts>(CONTACT_GET_MORE);

  const loadMore = () => {
    if (!contactData) return;
    setIsLoadingMore(true)

    fetchMore({
      query: CONTACT_GET_MORE,
      variables: {
        cursor: contactData.moreContacts.cursor
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setIsLoadingMore(false);

        if (!fetchMoreResult) return prevResult;
        const { contacts: prevContacts, cursor: prevCursor } = prevResult.moreContacts;
        const { contacts: newContacts, cursor: newCursor } = fetchMoreResult.moreContacts;

        return {
          moreContacts: {
            cursor: newCursor ?? prevCursor,
            contacts: [...prevContacts, ...newContacts]
          }
        }
      }
    });
  }

  return {
    loading,
    error,
    contactData,
    loadMore,
    isLoadingMore
  }
}

export const useDeleteContact = () => {
  return useMutation<IDeleteContact>(CONTACT_DELETE, {
    update(client, { data: { deleteContact } }: { data: IDeleteContact }) {
      const data = client.readQuery<IGetContacts>({ query: CONTACT_GET_MORE });
      if (data) {
        const index = data.moreContacts.contacts.findIndex(item => item.id === deleteContact);
        if (index === -1) return;

        const contacts = [...data.moreContacts.contacts];
        contacts.splice(index, 1);

        client.writeQuery({
          query: CONTACT_GET_MORE,
          data: { contacts }
        });
      }
    }
  });
};

export const useAddContact = (onCompleted: IOnCompleted<IAddContact>, onError?: (error: ApolloError) => void) => {

  return useMutation<IAddContact>(CONTACT_ADD, {
    update(client, { data: { addContact } }: { data: IAddContact }) {
      const data = client.readQuery<IGetContacts>({ query: CONTACT_GET_MORE });
      if (data) {
        client.writeQuery({
          query: CONTACT_GET_MORE,
          data: { contacts: [...data.moreContacts.contacts, addContact] }
        });
      }
    },
    onCompleted,
    onError
  });
}

export interface IEditContact {
  editContact: IContact;
};

export const useEditContact = (onCompleted: IOnCompleted<IEditContact>) => {
  return useMutation<IEditContact>(CONTACT_EDIT, {
    update(client, { data: { editContact } }: { data: IEditContact }) {
      const data = client.readQuery<IGetContacts>({ query: CONTACT_GET_MORE });
      if (data) {
        const index = data.moreContacts.contacts.findIndex(item => item.id === editContact.id);
        if (index === -1) return;

        const contacts = [...data.moreContacts.contacts];
        contacts.splice(index, 1, editContact);

        client.writeQuery({
          query: CONTACT_GET_MORE,
          data: { contacts }
        });
      }
    },
    onCompleted
  })
}