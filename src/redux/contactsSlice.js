import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = JSON.parse(localStorage.getItem('contacts')) || [
  { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: '2', name: 'Hermione Kline', number: '443-89-12' },
  { id: '3', name: 'Eden Clements', number: '645-17-79' },
  { id: '4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const isNameAlreadyExist = state.some(
          contact =>
            contact.name.toLowerCase() === action.payload.name.toLowerCase()
        );

        if (isNameAlreadyExist) {
          alert(
            `Contact with the name '${action.payload.name}' already exists.`
          );
        } else {
          return [...state, action.payload];
        }
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            ...contact,
          },
        };
      },
    },
    deleteContact: {
      reducer(state, action) {
        return state.filter(contact => contact.id !== action.payload.id);
      },
      prepare(id) {
        return {
          payload: {
            id: id,
          },
        };
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
