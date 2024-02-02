import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchContacts } from './contactsApi';

export interface Contact {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface ContactState {
  value: Contact[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContactState = {
  value: [],
  status: 'idle',
};

export const fetchContactsAsync = createAsyncThunk<Contact[]>(
  'contacts/fetchContacts',
  async () => {
    const response = await fetchContacts();
    return response;
  },
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      const contact = action.payload;
      state.value.unshift(contact);
    },

    deleteContact: (state, action: PayloadAction<number>) => {
      console.log('deleting..id: ' + action.payload);
      state.value = state.value.filter(
        contact => contact.id !== action.payload,
      );
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.value.map(contact => {
        if (contact.id === action.payload.id) {
          contact.email = action.payload.email;
          contact.first_name = action.payload.first_name;
          contact.last_name = action.payload.last_name;
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { addContact, deleteContact, updateContact } =
  contactsSlice.actions;

const emptyArray: Contact[] = [];

/**
 * This selector returns contacts whose names contains the search string
 * @param state Root state
 * @param name search string
 * @returns contacts which contain the search string
 */
export const filterContactsByName = (state: RootState, name: string) => {
  if (name === '') {
    //Returning an exisitng empty array reference rather than creating new ones every time
    return emptyArray;
  }
  return state.contacts.value.filter(contact => {
    const contactName =
      `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return contactName.includes(name.toLowerCase());
  });
};

export const selectContacts = (state: RootState) => state.contacts.value;
export const selectNextId = (state: RootState) =>
  Math.max(...state.contacts.value.map(contact => contact.id)) + 1;

export default contactsSlice.reducer;
