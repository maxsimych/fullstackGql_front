import { gql } from '@apollo/client';

export const CONTACT_GET_MORE = gql`
  query getMoreContacts($cursor: String) {
    moreContacts(cursor: $cursor) {
      cursor
      contacts {
        id
        name
        username
        email
        bio
        avatarUrl
        location
      }
    }
  }
`;

export const CONTACT_ADD = gql`
  mutation addContact($username: String!)  {
    addContact(username: $username) {
      id
      name
      username
      email
      bio
      avatarUrl
      location
    }
  }
`;

export const CONTACT_EDIT = gql`
  mutation editContact(
    $id: ID!
    $name: String
    $avatarUrl: String
    $bio: String
    $email: String
    $location: String
  ) {
    editContact(
      id: $id
      name: $name
      avatarUrl: $avatarUrl
      bio: $bio
      email: $email
      location: $location
    ) {
      id
      name
      username
      email
      bio
      avatarUrl
      location
    }
  }
`;

export const CONTACT_DELETE = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`