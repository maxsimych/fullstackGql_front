import { Dispatch, SetStateAction } from 'react';
import { ApolloError } from '@apollo/client';

export interface IContact {
  id: string;
  username: string;
  bio?: string;
  name?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

type OnClickType = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export interface IControl {
  isEdit: boolean;
  save: OnClickType;
  cancel: OnClickType;
  deleteItem: OnClickType;
  openEdit: OnClickType;
}

export interface IEditObj {
  id: string;
  avatarUrl?: string;
  name?: string;
  email?: string;
  location?: string;
  bio?: string;
}

export interface IContactInfo {
  editObj: IEditObj;
  setEditObj: Dispatch<SetStateAction<IEditObj>>;
  isEdit: boolean;
  username: string;
  name?: string;
  email?: string;
  location?: string;
  bio?: string;
}

export interface IDeleteContact {
  deleteContact: string;
}

export type IOnCompleted<TData> = (data: TData) => void;

export interface IAddContact {
  addContact: IContact
}

export interface IGetContacts {
  moreContacts: {
    cursor: string;
    contacts: IContact[]
  }
};

export interface ILoadMore {
  loading: boolean;
  error: ApolloError | undefined;
  contactData: IGetContacts | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
}